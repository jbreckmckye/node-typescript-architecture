import { User } from '../entities'
import { UUID } from 'io-ts-types/lib/UUID'

export class UserHasOutstandingLoans extends Error {
  constructor(public user: User) {
    super(`User has outstanding loans`)
  }
}

export class UserDoesNotExist extends Error {
  constructor(public id: UUID) {
    super(`User with ID ${id} does not exist`)
  }
}
