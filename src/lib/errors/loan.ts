import { UUID } from 'io-ts-types/lib/UUID'

export class BookWasNotLoaned extends Error {
  public invalidOperationErr = true

  constructor(public bookId: UUID) {
    super(`Book with ID ${bookId} was not loaned`)
  }
}

export class BookAlreadyLoaned extends Error {
  public invalidOperationErr = true

  constructor(public bookId: UUID) {
    super(`Cannot borrow book with ID ${bookId}, as it is already loaned`)
  }
}

export class UserLoanLimitExceeded extends Error {
  public invalidOperationErr = true

  constructor(public userId: UUID) {
    super(`User with ID ${userId} has exceeded their loan limit`)
  }
}
