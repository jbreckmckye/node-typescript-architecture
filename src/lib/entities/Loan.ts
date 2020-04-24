import t from 'io-ts'
import { UUID } from 'io-ts-types/lib/UUID'

import { User } from './User'
import { Book } from './Book'
import { $cast } from './cast'

// IO-TS Codecs
// ---------------------------------------------------------------

export const LoanInput = t.exact(
  t.type({
      userId: UUID,
      bookId: UUID
  })
)

export const Loan = t.exact(
  t.type({
      id: UUID,
      user: User,
      book: Book,
      returned: t.boolean
  })
)

export const LoanAccepted = t.exact(
  t.type({
    tag: t.literal('loanAccepted'),
    loan: Loan
  })
)

export const LoanDenied = t.exact(
  t.type({
    tag: t.literal('loanDenied'),
    reason: t.keyof({
      userHasTooManyLoans: null,
      bookIsAlreadyLoaned: null
    })
  })
)


// Casts
// ---------------------------------------------------------------

export const castLoanInput = $cast(LoanInput)
export const castLoan = $cast(Loan)
export const castLoanAccepted = $cast(LoanAccepted)


// Static types
// ---------------------------------------------------------------

export type LoanInput = t.TypeOf<typeof LoanInput>
export type Loan = t.TypeOf<typeof Loan>

export type LoanResolution =
  | LoanAccepted
  | LoanDenied

export type LoanAccepted = t.TypeOf<typeof LoanAccepted>
export type LoanDenied = t.TypeOf<typeof LoanDenied>
