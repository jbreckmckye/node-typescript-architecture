import { NextFunction, Request, Response } from 'express'

export type RouteConfig <T, U> = {
  fn: (input: T) => Promise<U>,
  getInput?: (req: object, params: object) => T,
  validateInput: (input: unknown) => T,
  onSuccess: (res: Response, output: U) => void
}

export function route <T, U> (config: RouteConfig<T, U>) {
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
