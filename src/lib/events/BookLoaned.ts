import { UUID } from 'io-ts-types/lib/UUID'

export type BookLoaned = {
  bookId: UUID,
  timestamp: Date
}
