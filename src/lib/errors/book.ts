import { UUID } from 'io-ts-types/lib/UUID'

export class BookDoesNotExist extends Error {
  constructor(public id: UUID) {
    super(`Book with ID ${id} does not exist`)
  }
}

export class BookWasNotLoaned extends Error {
  constructor(public id: UUID) {
    super(`Book with ID ${id} was not loaned`)
  }
}
