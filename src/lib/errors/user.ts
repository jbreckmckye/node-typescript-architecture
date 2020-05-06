import { User } from '../entities'
import { UUID } from 'io-ts-types/lib/UUID'

export class UserHasOutstandingLoans extends Error {
  public invalidOperation = true

  constructor(public user: User) {
    super(`User has outstanding loans`)
  }
}

export class UserDoesNotExist extends Error {
  public invalidOperation = true

  constructor(public id: UUID) {
    super(`User with ID ${id} does not exist`)
  }
}
