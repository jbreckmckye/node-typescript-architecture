import * as Operations from './operations'
import * as Entities from './entities'
import * as Errors from './errors'
import * as Events from './events'
import * as Ctx from './context'

import { ContextAdapter, wrapAdapter, mergeAdapters } from './context'

export {
  Ctx,
  Entities,
  Errors,
  Events,
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
