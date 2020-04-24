import { UUID } from 'io-ts-types/lib/UUID'

import {
  BookInput,
  Book,
  User,
  UserInput,
  Loan
} from '../entities'

export type Backend = {
  bookRepository: BookRepository,
  loanRepository: LoanRepository,
  userRepository: UserRepository,
}

export type BookRepository = {
  add:            (b: BookInput)     => Promise<Book>,
  delete:         (b: Book)          => Promise<void>,
  find:           (i: UUID)          => Promise<Book|null>
}

export type UserRepository = {
  add:            (u: UserInput)     => Promise<User>,
  delete:         (u: User)          => Promise<void>,
  find:           (i: UUID)          => Promise<User|null>
}

export type LoanRepository = {
  takeLoan:       (u: User, b: Book) => Promise<Loan>,
  endLoan:        (u: User, b: Book) => Promise<Loan>,
  getUserLoans:   (u: User)          => Promise<Loan[]>,
  getBookLoaner:  (b: Book)          => Promise<UUID|null>
}
