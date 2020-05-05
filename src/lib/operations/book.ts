import { Book, BookInput } from '../entities'
import { Context } from '../context'

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
