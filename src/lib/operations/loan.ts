import { UUID } from 'io-ts-types/lib/UUID'

import { Context } from '../context'
import { UserDoesNotExist, BookDoesNotExist, BookWasNotLoaned  } from '../errors'
import { Book, LoanInput, LoanResolution, User } from '../entities'

export async function loanBook (ctx: Context, loanInput: LoanInput): Promise<LoanResolution> {
  const {
    backend:    { userRepository, bookRepository, loanRepository },
    middleware: { events }
  } = ctx

  const user = await userRepository.find(loanInput.userId)
  assertUser(user, loanInput.userId)

  const book = await bookRepository.find(loanInput.bookId)
  assertBook(book, loanInput.bookId)

  const bookLoaner = await loanRepository.getBookLoaner(book)
  if (bookLoaner) {
    return {
      tag: 'loanDenied',
      reason: 'bookIsAlreadyLoaned'
    }
  }

  const userLoans = await loanRepository.getUserLoans(user)
  if (userLoans.length > 3) {
    return {
      tag: 'loanDenied',
      reason: 'userHasTooManyLoans'
    }
  }

  const loan = await loanRepository.takeLoan(user, book)

  await events.onLoanMade({
    loanId: loan.id
  })

  return {
    tag: 'loanAccepted',
    loan
  }
}

export async function returnBook (ctx: Context, bookId: UUID): Promise<void> {
  const {
    backend:    { userRepository, bookRepository, loanRepository }
  } = ctx

  const book = await bookRepository.find(bookId)
  assertBook(book, bookId)

  const loanerID = await loanRepository.getBookLoaner(book)
  if (!loanerID) throw new BookWasNotLoaned(bookId)

  const user = await userRepository.find(loanerID)
  assertUser(user, loanerID)

  await loanRepository.endLoan(user, book)
}

function assertUser (user: User | null, id: UUID): asserts user is User {
  if (!user) throw new UserDoesNotExist(id)
}

function assertBook (book: Book | null, id: UUID): asserts book is Book {
  if (!book) throw new BookDoesNotExist(id)
}
