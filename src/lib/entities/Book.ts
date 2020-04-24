import t from 'io-ts'
import { UUID } from 'io-ts-types/lib/UUID'
import { $cast } from './cast'

// IO-TS Codecs
// ---------------------------------------------------------------

export const BookInput = t.exact(t.type({
  name: t.string
}))

export const Book = t.exact(
  t.type({
    id: UUID,
    name: t.string,
    loanedBy: t.union([t.null, UUID])
  })
)


// Casts
// ---------------------------------------------------------------

export const castBook = $cast(Book)
export const castBookInput = $cast(BookInput)


// Static types
// ---------------------------------------------------------------

export type Book = t.TypeOf<typeof Book>
export type BookInput = t.TypeOf<typeof BookInput>
