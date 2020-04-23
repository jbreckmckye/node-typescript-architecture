import t from 'io-ts'
import { date } from 'io-ts-types/lib/date'
import { UUID } from 'io-ts-types/lib/UUID'

import { UserAccount } from './UserAccount'
import { Book } from './Book'

export type LoanInput = t.TypeOf<typeof LoanInput>
export const LoanInput = t.exact(
  t.type({
    user: UserAccount,
    book: Book,
    length: t.number
  })
)

export type LoanQuery = t.TypeOf<typeof LoanQuery>
export const LoanQuery = t.exact(
  t.type({
    id: UUID,
    user: UserAccount,
    book: Book,
    started: date,
    ends: date,
    active: t.boolean,
    finesPaid: t.number
  })
)

export type FinePayment = t.TypeOf<typeof FinePayment>
export const FinePayment = t.exact(
  t.type({
    user: UserAccount,
    book: Book,
    finesPaid: t.number
  })
)
