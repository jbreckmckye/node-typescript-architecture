import { UUID } from 'io-ts-types/lib/UUID'

export type UserAdded = {
  userId: UUID
}

export type UserDeleted = {
  userId: UUID
}
