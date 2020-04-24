import * as Operations from './operations'
import { CtxProvider } from './context'

export type Library = {
  addBook:      ReturnType<typeof Operations.$addBook>,
  addUser:      ReturnType<typeof Operations.$addUser>,
  loanBook:     ReturnType<typeof Operations.$loanBook>,
  removeUser:   ReturnType<typeof Operations.$removeUser>,
  returnBook:   ReturnType<typeof Operations.$returnBook>
}

export function createLibrary (ctx: CtxProvider): Library {
  return {
    addBook:    Operations.$addBook(ctx),
    addUser:    Operations.$addUser(ctx),
    loanBook:   Operations.$loanBook(ctx),
    removeUser: Operations.$removeUser(ctx),
    returnBook: Operations.$returnBook(ctx)
  }
}
