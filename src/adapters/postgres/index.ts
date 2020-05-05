import * as Repository from './repositories'
import { createConnectionPool, withClient, wrapTransaction } from './client'
import { ContextAdapter, Operation } from '@lib/context'

export async function $adapter (): Promise<ContextAdapter> {
  const pool = createConnectionPool()

  return async function adapter <I, O> (op: Operation<I, O>) {
    const client = await pool.connect()

    return {
      op: (ctx, input: I) => wrapTransaction(client, () => op(ctx, input)),
      ctx: {
        backend: {
          bookStore: {
            add:          withClient(client, Repository.Book.add),
            find:         withClient(client, Repository.Book.find)
          },

          loanStore: {
            takeLoan:     withClient(client, Repository.Loan.takeLoan),
            endLoan:      withClient(client, Repository.Loan.endLoan),
            getUserLoans: withClient(client, Repository.Loan.getUserLoans),
            getLoan:      withClient(client, Repository.Loan.getLoan)
          },

          userStore: {
            add:          withClient(client, Repository.User.add),
            remove:       withClient(client, Repository.User.remove),
            find:         withClient(client, Repository.User.find)
          }
        }
      }
    }
  }
}
