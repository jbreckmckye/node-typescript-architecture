import { Backend } from './backend'
import { Middleware } from './middleware'

export type Context = {
  backend: Backend,
  middleware: Middleware
}

export type CtxProvider = () => Promise<Context>
