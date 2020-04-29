import { Book, BookInput } from '../entities'
import { Context } from '../context'

export function $addBook (ctx: Context) {
  const {
    backend:    { bookRepository },
    middleware: { events }
  } = ctx

  return async function addBook (bookInput: BookInput): Promise<Book> {
    const book = await bookRepository.add(bookInput)

    await events.onBookAdded({
      bookId: book.id,
      name: book.name
    })

    return book
  }
}
