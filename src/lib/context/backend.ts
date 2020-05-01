import { UUID } from 'io-ts-types/lib/UUID'

import {
  BookInput,
  Book,
  User,
  UserInput,
  Loan
} from '../entities'

export type BackendCtx = {
  book: BookRepository,
  loan: LoanRepository,
  user: UserRepository,
}

export type BookRepository = {
  add:            (b: BookInput)     => Promise<Book>,
  find:           (i: UUID)          => Promise<Book|null>
}

export type UserRepository = {
  add:            (u: UserInput)     => Promise<User>,
  remove:         (u: User)          => Promise<void>,
  find:           (i: UUID)          => Promise<User|null>
}

export type LoanRepository = {
  takeLoan:       (u: User, b: Book) => Promise<Loan>,
  endLoan:        (l: Loan)          => Promise<Loan>,
  getUserLoans:   (u: User)          => Promise<Loan[]>,
  getBookLoaner:  (b: Book)          => Promise<UUID|null>
}
