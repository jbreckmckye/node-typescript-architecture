import * as t from 'io-ts'
import { UUID } from 'io-ts-types/lib/UUID'
import { $cast } from './cast'

const userFields = {
  name: t.string,
  address: t.type({
    line1: t.string,
    line2: t.union([t.string, t.undefined]),
    postalCode: t.string
  })
}

// IO-TS Codecs
// ---------------------------------------------------------------

export const UserInput = t.exact(t.type(userFields))
export const User = t.exact(
  t.type({
    id: UUID,
    ...userFields
  })
)


// Casts
// ---------------------------------------------------------------

export const castUserInput = $cast(UserInput)
export const castUser = $cast(User)


// Static types
// ---------------------------------------------------------------

export type UserInput = t.TypeOf<typeof UserInput>
export type User = t.TypeOf<typeof User>
