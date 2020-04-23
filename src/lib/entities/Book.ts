import t from 'io-ts'
import { UUID } from 'io-ts-types/lib/UUID'

const bookFields = {
  name: t.string
}

export type Book = t.TypeOf<typeof Book>
export const Book = t.exact(
  t.type({
    id: UUID,
    ...bookFields
  })
)

export type BookInput = t.TypeOf<typeof BookInput>
export const BookInput = t.exact(t.type(bookFields))
