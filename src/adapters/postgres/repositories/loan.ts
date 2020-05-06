import { PoolClient } from 'pg'
import { Book, castLoan, Loan, LoanInput, User } from '@lib/entities'
import { justOne, oneOrNone } from '../asserts'
import { rowToObject } from '@adapters/postgres/util'

export async function takeLoan (client: PoolClient, loanInput: LoanInput): Promise<Loan> {
  const { rows } = await client.query({
    text: `
      INSERT INTO loans ("user_id", "book_id")
      VALUES ($1, $2)
      RETURNING *`,
    values: [loanInput.userId, loanInput.bookId]
  })

  return justOne(rows.map(rowToObject).map(castLoan))
}

export async function endLoan (client: PoolClient, loan: Loan): Promise<Loan> {
  const { rows } = await client.query({
    text: `
      UPDATE loans SET returned = TRUE
      WHERE book_id = $1 AND returned = FALSE
      RETURNING *`,
    values: [loan.bookId]
  })

  return justOne(rows.map(rowToObject).map(castLoan))
}

export async function getUserLoans (client: PoolClient, user: User): Promise<Loan[]> {
  const { rows } = await client.query({
    text: `
      SELECT * FROM loans 
      WHERE user_id = $1 AND returned = FALSE`,
    values: [user.id]
  })

  return rows.map(rowToObject).map(castLoan)
}

export async function getLoan (client: PoolClient, book: Book): Promise<Loan|null> {
  const { rows } = await client.query({
    text: `
      SELECT * FROM loans
      WHERE book_id = $1 AND returned = FALSE`,
    values: [book.id]
  })

  return oneOrNone(rows.map(rowToObject).map(castLoan))
}
