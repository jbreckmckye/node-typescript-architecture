import { Book, BookInput, UserAccount, UserAccountInput } from '../entities'
import { LoanQuery } from '../entities/Loan'
import { UUID } from 'io-ts-types/lib/UUID'

export type Backend = {
  bookRepository: BookRepository,
  loanRepository: LoanRepository,
  userRepository: UserRepository,
}

export type BookRepository = {
  add:    (b: BookInput) => Promise<Book>,
  delete: (b: Book)      => Promise<void>
}

export type UserRepository = {
  add:    (u: UserAccountInput) => Promise<UserAccount>,
  delete: (u: UserAccount)      => Promise<void>
}

export type LoanRepository = {
  checkout: (u: UserAccount, b: Book) => Promise<LoanQuery>,
  return:   (u: UserAccount, b: Book) => Promise<LoanQuery>,
  getLoan:  (i: UUID)                 => Promise<LoanQuery>,
  getLoans: (u: UserAccount)          => Promise<LoanQuery[]>,
  payFine:  (l: LoanQuery, credits: number)
                                      => Promise<void>
}

