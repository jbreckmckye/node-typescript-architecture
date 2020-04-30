import { Book, BookInput } from '../entities'
import { Context } from '../context'

export async function addBook (ctx: Context, bookInput: BookInput): Promise<Book> {
  const {
    backend:    { bookRepository },
    middleware: { events }
  } = ctx

  const book = await bookRepository.add(bookInput)

  await events.onBookAdded({
    bookId: book.id,
    name: book.name
  })

  return book

}
