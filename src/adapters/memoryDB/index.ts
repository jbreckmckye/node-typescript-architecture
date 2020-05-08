import { Ctx } from '@lib'
import * as Repository from './repositories'
import { createDB, withDB } from '@adapters/memoryDB/db'

export async function $adapter (): Promise<Ctx.ContextAdapter> {
  const db = createDB()
  const backend = {
    bookStore: {
      add:          withDB(db, Repository.Book.add),
      find:         withDB(db, Repository.Book.find)
    },

    loanStore: {
      takeLoan:     withDB(db, Repository.Loan.takeLoan),
      endLoan:      withDB(db, Repository.Loan.endLoan),
      getUserLoans: withDB(db, Repository.Loan.getUserLoans),
      getLoan:      withDB(db, Repository.Loan.getLoan)
    },

    userStore: {
      add:          withDB(db, Repository.User.add),
      remove:       withDB(db, Repository.User.remove),
      find:         withDB(db, Repository.User.find)
    }
  }

  return async function adapter <I, O> (op: Ctx.Operation<I, O>) {
    return { op, ctx: { backend }}
  }
}
