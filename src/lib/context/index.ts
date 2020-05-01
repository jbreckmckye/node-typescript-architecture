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

export type CtxTreeResolver <C extends Record<string, Function>> =
  <K extends keyof C> (key: K) =>
    C[K] extends ((input: infer T) => infer U) ? (input: T) => Promise<U> : never

export type CtxTreeProvider <C extends Record<string, any>> =
  C extends Record<string, Function> ? CtxTreeResolver<C> :
  C extends Record<string, object> ? { [P in keyof C]: CtxTreeProvider<C[P]> } :
  never

export type ContextProvider = CtxTreeProvider<Context>
