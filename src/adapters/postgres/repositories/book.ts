import { PoolClient } from 'pg'
import { UUID } from 'io-ts-types/lib/UUID'
import { Book, BookInput } from '@lib/entities'
import { justOne } from '../asserts'

export async function add (client: PoolClient, input: BookInput) {
  const { rows } = await client.query({
    text: `INSERT INTO books ("name") VALUES $1`,
    values: [input.name]
  })

  return justOne<Book>(rows)
}

export async function find (client: PoolClient, input: UUID) {
  const { rows } = await client.query({
    text: `SELECT * FROM books WHERE id = $1`,
    values: [input]
  })

  return justOne<Book>(rows)
}
