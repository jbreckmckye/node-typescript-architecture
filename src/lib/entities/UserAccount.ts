import t from 'io-ts'
import { UUID } from 'io-ts-types/lib/UUID'

const userFields = {
  name: t.string,
  address: t.type({
    line1: t.string,
    line2: t.union([t.string, t.undefined]),
    postalCode: t.string
  })
}

export type UserAccount = t.TypeOf<typeof UserAccount>
export const UserAccount = t.exact(
  t.type({
    id: UUID,
    ...userFields
  })
)

export type UserAccountInput = t.TypeOf<typeof UserAccountInput>
export const UserAccountInput = t.exact(t.type(userFields))
