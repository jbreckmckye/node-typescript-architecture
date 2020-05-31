import { BackendCtx } from './backend'
import { EventsCtx } from './events'

export {
  BackendCtx,
  EventsCtx
}

export type Context = {
  backend: BackendCtx,
  events: EventsCtx
}

export type Operation <I, O> = (c: Context, i: I) => Promise<O>

export type ContextAdapter <C = Context, P = any> =
  <I, O> (op: Operation<I, O>, params?: P) => Promise<{ ctx: Partial<C>, op: Operation<I, O> }>

export function mergeAdapters <C = Context, P = any> (...args: ContextAdapter<C, P>[]): ContextAdapter<C, P> {
  const [first, ...rest] = args

  return async function (op, params) {
    const result = await first(op, params)

    if (rest.length === 0) {
      return result

    } else {
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
}

export function wrapAdapter <I, O, CA extends ContextAdapter> (adapter: CA, operation: Operation<I, O>) {
  return async function (input: I, adapterParams?: any) {
    const { ctx, op } = await adapter(operation, adapterParams)
    return op(ctx as Context, input)
  }
}
