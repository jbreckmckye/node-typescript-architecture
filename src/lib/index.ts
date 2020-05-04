import * as Operations from './operations'
import { Context, ContextAdapter, mergeAdapters, wrapAdapter } from './context'

export {
  Context,
  ContextAdapter,
  Operations,
  mergeAdapters
}

export type Library = ReturnType<typeof createLibrary>

export function createLibrary <Adapter extends ContextAdapter> (adapter: Adapter) {
  return {
    book: {
      add:    wrapAdapter(adapter, Operations.addBook)
    },
    loan: {
      take:   wrapAdapter(adapter, Operations.loanBook),
      return: wrapAdapter(adapter, Operations.returnBook)
    },
    user: {
      add:    wrapAdapter(adapter, Operations.addUser),
      remove: wrapAdapter(adapter, Operations.removeUser)
    }
  }
}
