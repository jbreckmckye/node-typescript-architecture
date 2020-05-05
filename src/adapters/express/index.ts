import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { Library, Entities } from '@lib'

export function adapter (lib: Library) {
  const port = process.env.PORT || 3000
  const app = express()

  app.use(bodyParser.json())

  app.get('/health', (req, res) => res.sendStatus(200))

  app.post('/book', adaptRoute({
    fn: lib.book.add,
    validateInput: Entities.castBookInput,
    onSuccess: (res, result) => res.status(201).json(result)
  }))

  app.post('/loan', adaptRoute({
    fn: lib.loan.take,
    validateInput: Entities.castLoanInput,
    onSuccess: (res, result) => res.status(201).json(result)
  }))

  app.post('/return/:loanID', adaptRoute({
    fn: lib.loan.return,
    validateInput: Entities.castUUID,
    getInput: (req, params) => (params as any).loanID,
    onSuccess: (res) => res.sendStatus(200)
  }))

  app.post('/user', adaptRoute({
    fn: lib.user.add,
    validateInput: Entities.castUserInput,
    onSuccess: (res, result) => res.status(201).json(result)
  }))

  app.delete('/user/:userID', adaptRoute({
    fn: lib.user.remove,
    validateInput: Entities.castUUID,
    onSuccess: (res) => res.sendStatus(200)
  }))

  app.listen(port, () => {
    console.log('Example library app listening at port', port)
  })
}

type AdaptRouteConfig <T, U> = {
  fn: (input: T) => Promise<U>,
  getInput?: (req: object, params: object) => T,
  validateInput: (input: unknown) => T,
  onSuccess: (res: Response, output: U) => void
}

function adaptRoute <T, U> (config: AdaptRouteConfig<T, U>) {
  const { fn, validateInput, onSuccess, getInput } = config

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = getInput
        ? getInput(req.body, req.params)
        : req.body

      const validatedInput = await Promise.resolve(input)
        .then(validateInput)
        .catch(err => {
          res.sendStatus(400)
          throw err
        })

      const output = await Promise.resolve(validatedInput)
        .then(fn)
        .catch(err => {
          if (err && err.operationFailure) {
            res.status(422).json(err)
          } else {
            res.sendStatus(500)
          }
          throw err
        })

      await onSuccess(res, output)

    } catch (err) {
      return next(err)
    }

  }
}
