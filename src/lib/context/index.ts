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

export type ContextAdapter <C = Context, P = any> =
  <I, O> (op: Operation<I, O>, params?: P) => Promise<{ ctx: Partial<C>, op: Operation<I, O> }>

export function mergeAdapters <C = Context, P = any> (...args: ContextAdapter<C, P>[]): ContextAdapter<C, P> {
  const [first, ...rest] = args

  return async function (op, params) {
    const result = await first(op, params)
    const restResult = await (mergeAdapters(...rest)(result.op, params))
    return {
      ctx: {
        ...result.ctx,
        ...restResult.ctx
      },
      op: restResult.op
    }
  }
}

export function wrapAdapter <I, O, CA extends ContextAdapter> (adapter: CA, operation: Operation<I, O>) {
  type AdapterParams = CA extends ContextAdapter<Context, infer Params>
    ? Params : any

  return async function (input: I, adapterParams?: AdapterParams) {
    const { ctx, op } = await adapter(operation, adapterParams)
    return op(ctx as Context, input)
  }
}
