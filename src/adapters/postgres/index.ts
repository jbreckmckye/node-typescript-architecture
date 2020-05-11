import * as Repository from './repositories'
import { createConnectionPool, withClient, wrapTransaction } from './client'
import { ContextAdapter, Operation } from '@lib/context'

// The naming convention '$foo' means a function that returns another function 'foo'
// Here we are preparing an adapter function that will inject dependencies into the library at runtime.
// We call this a 'context adapter', because its output is passed as a 'context' parameter to the domain function.

export async function $adapter (): Promise<ContextAdapter> {
  // In the outer closure, you can set up resources that will be shared between requests.
  // Here we create a database connection pool we can re-use.
  
  const pool = createConnectionPool()

  return async function adapter <I, O> (op: Operation<I, O>) {
    // In this inner closure, we do work that has to be done per-request

    const client = await pool.connect()

    // WrapTransaction and WithClient are higher order functions we're using
    // to add database transactions and inject the db into the adapter DB functions ('Repositories')

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
