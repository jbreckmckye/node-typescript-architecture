import { UUID } from 'io-ts-types/lib/UUID'

import { Context } from '../context'
import { UserDoesNotExist, BookDoesNotExist, BookWasNotLoaned  } from '../errors'
import { Book, LoanInput, LoanResolution, User } from '../entities'


export async function loanBook (ctx: Context, loanInput: LoanInput): Promise<LoanResolution> {
  const {
    backend:    { userStore, bookStore, loanStore },
    middleware: { events }
  } = ctx

  const user = await userStore.find(loanInput.userId)
  assertUser(user, loanInput.userId)

  const book = await bookStore.find(loanInput.bookId)
  assertBook(book, loanInput.bookId)

  const existingLoan = await loanStore.getLoan(book)
  if (existingLoan) {
    return {
      tag: 'loanDenied',
      reason: 'bookIsAlreadyLoaned'
    }
  }

  const userLoans = await loanStore.getUserLoans(user)
  if (userLoans.length > 3) {
    return {
      tag: 'loanDenied',
      reason: 'userHasTooManyLoans'
    }
  }

  const newLoan = await loanStore.takeLoan({
    bookId: book.id,
    userId: user.id
  })

  await events.onLoanMade({
    loanId: newLoan.id
  })

  return {
    tag: 'loanAccepted',
    loan: newLoan
  }
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
