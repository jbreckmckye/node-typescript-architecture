import { Book, BookInput } from '../entities'
import { CtxProvider } from '../context'

export function $addBook (ctx: CtxProvider) {
  return async function addBook (bookInput: BookInput): Promise<Book> {
    const {
      backend:    { bookRepository },
      middleware: { events }
    } = await ctx()

    const book = await bookRepository.add(bookInput)
    ;
    console.log('the generated book was', JSON.stringify(book, null, 2))

    await events.onBookAdded({
      bookId: book.id,
      name: book.name
    })

    return book
  }
}
