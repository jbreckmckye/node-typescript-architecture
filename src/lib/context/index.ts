import { BackendCtx } from './backend'
import { MiddlewareCtx } from './middleware'

export {
  BackendCtx,
  MiddlewareCtx
}

export type Contexts = {
  backend: BackendCtx,
  middleware: MiddlewareCtx
}

export type CtxResolver <C extends Record<string, Function>> =
  <K extends keyof C> (key: K) =>
    C[K] extends ((input: infer T) => infer U) ? (input: T) => Promise<U> : never

export type CtxProvider <C extends Record<string, any>> =
  C extends Record<string, Function> ? CtxResolver<C> :
  C extends Record<string, object> ? { [P in keyof C]: CtxProvider<C[P]> } :
  never

