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

export type Operation <I, O> = (c: Context, i: I) => Promise<O>

export type ContextAdapter <C = Context> =
  <I, O> (op: Operation<I, O>) => Promise<{ ctx: Partial<C>, op: Operation<I, O> }>

export function mergeAdapters <C = Context> (...args: ContextAdapter<C>[]): ContextAdapter<C> {
  const [first, ...rest] = args

  return async function (op) {
    const result = await first(op)
    const restResult = await (mergeAdapters(...rest)(result.op))
    return {
      ctx: {
        ...result.ctx,
        ...restResult.ctx
      },
      op: restResult.op
    }
  }
}
