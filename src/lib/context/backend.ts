import { UUID } from 'io-ts-types/lib/UUID'

import {
  BookInput,
  Book,
  User,
  UserInput,
  Loan, LoanInput
} from '../entities'

export type BackendCtx = {
  bookStore: BookStore,
  loanStore: LoanStore,
  userStore: UserStore,
}

export type BookStore = {
  add:            (b: BookInput)     => Promise<Book>,
  find:           (i: UUID)          => Promise<Book|null>
}

export type UserStore = {
  add:            (u: UserInput)     => Promise<User>,
  remove:         (u: User)          => Promise<void>,
  find:           (i: UUID)          => Promise<User|null>
}

export type LoanStore = {
  takeLoan:       (l: LoanInput)     => Promise<Loan>,
  endLoan:        (l: Loan)          => Promise<Loan>,
  getUserLoans:   (u: User)          => Promise<Loan[]>,
  getLoan:        (b: Book)          => Promise<Loan|null>
}
