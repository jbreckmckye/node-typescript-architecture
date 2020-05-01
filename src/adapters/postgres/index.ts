import * as Repository from './repositories'
import { $getClient, GetClient, wrapTransaction } from './client'
import { BackendCtx, CtxProvider, CtxResolver } from '@lib/context'

type QueryMap = Record<string, Function>

export function $backendContext () {
  const getClient = $getClient()

  return function backendContext (): CtxProvider<BackendCtx> {
    return {
      book: $resolveFn(getClient, {
        add:           Repository.Book.add,
        find:          Repository.Book.find
      }) as CtxResolver<BackendCtx['book']>,

      loan: $resolveFn(getClient, {
        takeLoan:      Repository.Loan.takeLoan,
        endLoan:       Repository.Loan.endLoan,
        getUserLoans:  Repository.Loan.getUserLoans,
        getBookLoaner: Repository.Loan.getBookLoaner
      }) as CtxResolver<BackendCtx['loan']>,

      user: $resolveFn(getClient, {
        add:           Repository.User.add,
        find:          Repository.User.find,
        remove:        Repository.User.remove
      }) as CtxResolver<BackendCtx['user']>

    }
  }
}

function $resolveFn <M extends QueryMap>(getClient: GetClient, map: M) {
  return function resolveFn <K extends keyof M> (key: K) {
    const fn = map[key]

    if (!fn) {
      throw new Error('No function of name ' + key)
    }

    return async function <T, U> (input: T): Promise<U> {
      const client = await getClient()
      return wrapTransaction(client, client => fn(client, input))
    }
  }
}

// const context = $backendContext()
//
// const add = context().user('add')
// const find = context().user('find')
//
// const uln = context().loan('getUserLoans')

// const t : CtxResolver<BackendCtx['book']> = ({}) as any
// const a = t('add')

