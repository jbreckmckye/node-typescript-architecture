import { BackendCtx } from './backend'
import { MiddlewareCtx } from './middleware'

export {
  BackendCtx,
  MiddlewareCtx
}

export type Context = {
  backend: BackendCtx,
  middleware: MiddlewareCtx
}
