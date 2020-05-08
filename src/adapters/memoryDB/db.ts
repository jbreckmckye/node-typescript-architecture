import { Book, Loan, User } from '@lib/entities'

export type MemoryDB = {
  books: Set<Book>,
  loans: Set<Loan>,
  users: Set<User>,
}

export function createDB (): MemoryDB {
  return {
    books: new Set(),
    loans: new Set(),
    users: new Set()
  }
}

export function withDB <I, O> (db: MemoryDB, fn: (db: MemoryDB, input: I) => Promise<O>): (input: I) => Promise<O> {
  return function (input: I) {
    return fn(db, input)
  }
}
