import { Book, BookInput } from '../entities'
import { ContextProvider } from '../context'

export async function addBook (ctx: ContextProvider, bookInput: BookInput): Promise<Book> {
  const {
    backend:    { bookStore },
    middleware: { events }
  } = ctx

  const book = await bookStore('add')(bookInput)

  await events('onBookAdded')({
    bookId: book.id,
    name: book.name
  })

  return book

}
