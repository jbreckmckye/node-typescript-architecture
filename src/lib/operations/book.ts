import { Book, BookInput } from '../entities'
import { Context } from '../context'
import { UUID } from 'io-ts-types'
import { BookDoesNotExist, BookHasOutstandingLoan } from '@lib/errors'

export async function addBook (ctx: Context, bookInput: BookInput): Promise<Book> {
  const {
    backend: { bookStore },
    events
  } = ctx

  const book = await bookStore.add(bookInput)

  await events.onBookAdded({
    bookId: book.id,
    name: book.name
  })

  return book
}

export async function removeBook (ctx: Context, bookId: UUID): Promise<void> {
  const {
    backend: { bookStore, loanStore },
    events
  } = ctx

  const book = await bookStore.find(bookId)
  assertBook(book, bookId)

  const activeLoan = await loanStore.getLoan(book)
  if (activeLoan) {
    throw new BookHasOutstandingLoan(bookId)
  }

  await bookStore.remove(book)

  await events.onBookRemoved({
    bookId: bookId
  })
}

function assertBook (book: Book | null, id: UUID): asserts book is Book {
  if (!book) throw new BookDoesNotExist(id)
}
