import { UUID } from 'io-ts-types/lib/UUID'

export class BookDoesNotExist extends Error {
  public invalidOperationErr = true

  constructor(public id: UUID) {
    super(`Book with ID ${id} does not exist`)
  }
}

export class BookHasOutstandingLoan extends Error {
  public invalidOperationErr = true

  constructor(public id: UUID) {
    super(`Book with ID ${id} has an outstanding loan`)
  }
}
