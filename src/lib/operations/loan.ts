import { UUID } from 'io-ts-types/lib/UUID'

import { Context } from '../context'
import { UserDoesNotExist, BookDoesNotExist, BookWasNotLoaned  } from '../errors'
import { Book, LoanInput, Loan, User } from '../entities'
import { BookAlreadyLoaned, UserLoanLimitExceeded } from '@lib/errors/loan'


export async function loanBook (ctx: Context, loanInput: LoanInput): Promise<Loan> {
  const {
    backend: { userStore, bookStore, loanStore },
    events
  } = ctx

  const user = await userStore.find(loanInput.userId)
  assertUser(user, loanInput.userId)

  const book = await bookStore.find(loanInput.bookId)
  assertBook(book, loanInput.bookId)

  const existingLoan = await loanStore.getLoan(book)
  if (existingLoan) {
    throw new BookAlreadyLoaned(loanInput.bookId)
  }

  const userLoans = await loanStore.getUserLoans(user)
  if (userLoans.length > 3) {
    throw new UserLoanLimitExceeded(loanInput.userId)
  }

  const loan = await loanStore.takeLoan({
    bookId: book.id,
    userId: user.id
  })

  await events.onLoanMade({
    bookName: book.name
  })

  return loan
}


export async function returnBook (ctx: Context, bookId: UUID): Promise<void> {
  const {
    backend:    { bookStore, loanStore }
  } = ctx

  const book = await bookStore.find(bookId)
  assertBook(book, bookId)

  const loan = await loanStore.getLoan(book)
  if (!loan) throw new BookWasNotLoaned(bookId)

  await loanStore.endLoan(loan)
}


function assertUser (user: User | null, id: UUID): asserts user is User {
  if (!user) throw new UserDoesNotExist(id)
}

function assertBook (book: Book | null, id: UUID): asserts book is Book {
  if (!book) throw new BookDoesNotExist(id)
}
