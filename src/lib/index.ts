import * as Operations from './operations'
import { Context } from './context'

type Operation <I, O> = (ctx: Context, input: I) => Promise<O>

export { Operations }
