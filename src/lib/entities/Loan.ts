import * as t from 'io-ts'
import { UUID } from 'io-ts-types/lib/UUID'

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
      userId: UUID,
      bookId: UUID,
      returned: t.boolean
  })
)


// Casts
// ---------------------------------------------------------------

export const castLoanInput = $cast(LoanInput)
export const castLoan = $cast(Loan)


// Static types
// ---------------------------------------------------------------

export type LoanInput = t.TypeOf<typeof LoanInput>
export type Loan = t.TypeOf<typeof Loan>

