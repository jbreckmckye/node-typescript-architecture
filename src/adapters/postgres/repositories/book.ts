import { PoolClient } from 'pg'
import { UUID } from 'io-ts-types/lib/UUID'
import { Book, BookInput, castBook } from '@lib/entities'
import { justOne, oneOrNone } from '../asserts'

export async function add (client: PoolClient, input: BookInput): Promise<Book> {
  const { rows } = await client.query({
    text: `
      INSERT INTO books ("name")
      VALUES ($1)
      RETURNING *`,
    values: [input.name]
  })

  return justOne(rows.map(castBook))
}

export async function find (client: PoolClient, input: UUID): Promise<Book|null> {
  const { rows } = await client.query({
    text: `
      SELECT * FROM books
      WHERE id = $1`,
    values: [input]
  })

  return oneOrNone(rows.map(castBook))
}
