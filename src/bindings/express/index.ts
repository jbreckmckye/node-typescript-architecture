import express from 'express'
import bodyParser from 'body-parser'
import { Library, Entities } from '@lib'
import { route } from './route'

export function binding (lib: Library) {
  const port = 3000
  const app = express()

  app.use(bodyParser.json())

  app.get('/health', (req, res) => res.sendStatus(200))

  app.post('/book', route({
    fn: lib.book.add,
    validateInput: Entities.castBookInput,
    onSuccess: (res, result) => res.status(201).json(result)
  }))

  app.post('/loan', route({
    fn: lib.loan.take,
    validateInput: Entities.castLoanInput,
    onSuccess: (res, result) => res.status(201).json(result)
  }))

  app.post('/return/:loanID', route({
    fn: lib.loan.return,
    validateInput: Entities.castUUID,
    getInput: (req, params) => (params as any).loanID,
    onSuccess: (res) => res.sendStatus(200)
  }))

  app.post('/user', route({
    fn: lib.user.add,
    validateInput: Entities.castUserInput,
    onSuccess: (res, result) => res.status(201).json(result)
  }))

  app.delete('/user/:userID', route({
    fn: lib.user.remove,
    validateInput: Entities.castUUID,
    onSuccess: (res) => res.sendStatus(200)
  }))

  app.listen(port, () => {
    console.log('Example library app listening at port', port)
  })
}
