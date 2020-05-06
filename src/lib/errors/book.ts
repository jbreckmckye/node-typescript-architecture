import { UUID } from 'io-ts-types/lib/UUID'

export class BookDoesNotExist extends Error {
  public invalidOperation = true

  constructor(public id: UUID) {
    super(`Book with ID ${id} does not exist`)
  }
}

