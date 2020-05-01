import { PoolClient } from 'pg'
import { UUID } from 'io-ts-types/lib/UUID'
import { Book, castLoan, castUUID, Loan, User } from '@lib/entities'
import { justOne, oneOrNone } from '../asserts'

export async function takeLoan (client: PoolClient, user: User, book: Book): Promise<Loan> {
  const { rows } = await client.query({
    text: `
      INSERT INTO loans ("userId", "bookId")
      VALUES $1, $2`,
    values: [user.id, book.id]
  })

  return castLoan(justOne(rows))
}

export async function endLoan (client: PoolClient, loan: Loan): Promise<Loan> {
  const { rows } = await client.query({
    text: `
      UPDATE loans SET returned = TRUE
      WHERE book_id = $1`,
    values: [loan.book.id]
  })

  return castLoan(justOne(rows))
}

export async function getUserLoans (client: PoolClient, user: User): Promise<Loan[]> {
  const { rows } = await client.query({
    text: `
      SELECT * loans 
      WHERE user_id = $1`,
    values: [user.id]
  })

  return rows.map(castLoan)
}

export async function getBookLoaner (client: PoolClient, book: Book): Promise<UUID|null> {
  const { rows } = await client.query({
    text: `
      SELECT user_id FROM loans
      WHERE book_id = $1`,
    values: [book.id]
  })

  return oneOrNone(rows.map(castUUID))
}
