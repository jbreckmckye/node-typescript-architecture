import { UUID } from 'io-ts-types/lib/UUID'

export type BookAdded = {
  bookId: UUID,
  name: string
}

export type BookRemoved = {
  bookId: UUID
}
