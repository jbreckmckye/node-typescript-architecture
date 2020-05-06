import { PoolClient } from 'pg'
import { UUID } from 'io-ts-types/lib/UUID'
import { castUser, User, UserInput } from '@lib/entities'
import { justOne, oneOrNone } from '../asserts'

export async function add (client: PoolClient, input: UserInput): Promise<User> {
  const { name, address } = input
  const { rows } = await client.query({
    text: `
      INSERT INTO users ("name", "address_line1", "address_line2", "postal_code")
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
    values: [name, address.line1, address.line2, address.postalCode]
  })

  return justOne(rows.map(rowToUser).map(castUser))
}

export async function find (client: PoolClient, input: UUID): Promise<User|null> {
  const { rows } = await client.query({
    text: `
      SELECT * FROM users WHERE id = $1
    `,
    values: [input]
  })

  return oneOrNone(rows.map(rowToUser).map(castUser))
}

export async function remove (client: PoolClient, input: User): Promise<void> {
  await client.query({
    text: `
      DELETE FROM loans WHERE user_id = $1
    `,
    values: [input.id]
  })

  await client.query({
    text: `
      DELETE FROM users WHERE id = $1
    `,
    values: [input.id]
  })
}

function rowToUser (row: { [key: string]: any }) {
  return {
    id:           row.id,
    name:         row.name,
    address: {
      line1:      row.address_line1,
      line2:      row.address_line2,
      postalCode: row.postal_code
    }
  }
}
