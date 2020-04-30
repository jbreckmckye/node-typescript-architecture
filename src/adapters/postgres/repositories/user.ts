import { PoolClient } from 'pg'
import { UUID } from 'io-ts-types/lib/UUID'
import { Book, BookInput, User, UserInput } from '@lib/entities'
import { justOne } from '../asserts'

export async function add (client: PoolClient, input: UserInput) {
  const { name, address } = input
  const { rows } = await client.query({
    text: `
      INSERT INTO users ("name", "address_line1", "address_line2", "postal_code")
      VALUES      $1, $2, $3, $4`,
    values: [name, address.line1, address.line2, address.postalCode]
  })

  return justOne<User>(rows)
}

export async function find (client: PoolClient, input: UUID) {
  const { rows } = await client.query({
    text: `
      SELECT * FROM users WHERE user_id = $1
    `,
    values: [input]
  })

  return justOne<User>(rows)
}

export async function remove (client: PoolClient, input: UUID) {
  await client.query({
    text: `
      DELETE FROM books WHERE book_id = $1
    `,
    values: [input]
  })
}
