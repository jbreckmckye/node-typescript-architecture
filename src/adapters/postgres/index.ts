import * as Repository from './repositories'
import { $getClient, GetClient, wrapTransaction } from './client'
import { PoolClient } from 'pg'

type QueryFn <T, U> = (client: PoolClient, input: T) => Promise<U>
type QueryMap = Record<string, QueryFn<any, any>>

export function $backendContext () {
  const getClient = $getClient()

  return function backendContext () {
    return {
      book: $resolveFn(getClient, {
        add:           Repository.Book.add,
        find:          Repository.Book.find
      }),

      loan: $resolveFn(getClient, {
        takeLoan:      Repository.Loan.takeLoan,
        endLoan:       Repository.Loan.endLoan,
        getUserLoans:  Repository.Loan.getUserLoans,
        getBookLoaner: Repository.Loan.getBookLoaner
      }),

      user: $resolveFn(getClient, {
        add:           Repository.User.add,
        find:          Repository.User.find,
        remove:        Repository.User.remove
      })
    }
  }
}

function $resolveFn <M extends QueryMap>(getClient: GetClient, map: M) {
  return function resolveFn <K extends keyof M> (key: K) {
    const fn = map[key]

    type Input =  (typeof fn) extends QueryFn<infer T, infer U> ? T : never
    type Output = (typeof fn) extends QueryFn<infer T, infer U> ? U : never

    return async function (input: Input): Promise<Output> {
      const client = await getClient()
      return wrapTransaction(client, client => fn(client, input))
    }
  }
}

// const context = $context()
//
// const add = context().user('add')
// const find = context().user('find')
//
// const uln = context().loan('getUserLoans')

