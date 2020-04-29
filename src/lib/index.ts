import * as Operations from './operations'
import { Context } from './context'

export type Operation   <T, U> = (input: T) => Promise<U>
export type $Operation  <T, U> = (ctx: Context) => Operation<T, U>
export type CtxProvider        = <O> ($operation: O) => O extends $Operation<infer T, infer U> ? Operation<T, U> : never

export { Operations }

export function createLibrary <O> (ctxProvider: CtxProvider) {
  return {
    addBook:    ctxProvider(Operations.$addBook),
    addUser:    ctxProvider(Operations.$addUser),
    loanBook:   ctxProvider(Operations.$loanBook),
    removeUser: ctxProvider(Operations.$removeUser),
    returnBook: ctxProvider(Operations.$returnBook)
  }
}
