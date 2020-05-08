import { v4 as uuid } from 'uuid'
import { UUID } from 'io-ts-types/lib/UUID'
import { MemoryDB } from '../db'
import { Book, BookInput, castBook } from '@lib/entities'

export async function add (db: MemoryDB, input: BookInput): Promise<Book> {
  console.log('creating in-memory book')

  const book = castBook({
    ...input,
    id: uuid()
  })
  db.books.add(book)
  return book
}

export async function find (db: MemoryDB, input: UUID): Promise<Book|null> {
  for (const book of db.books) {
    if (book.id === input) {
      return castBook(book)
    }
  }
  return null
}
