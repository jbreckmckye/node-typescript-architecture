import { PoolClient } from 'pg'
import { Book, castLoan, Loan, LoanInput, User } from '@lib/entities'
import { justOne, oneOrNone } from '../asserts'

export async function takeLoan (client: PoolClient, loanInput: LoanInput): Promise<Loan> {
  const { rows } = await client.query({
    text: `
      INSERT INTO loans ("userId", "bookId")
      VALUES $1, $2`,
    values: [loanInput.userId, loanInput.bookId]
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
      WHERE user_id = $1 AND returned = FALSE`,
    values: [user.id]
  })

  return rows.map(castLoan)
}

export async function getLoan (client: PoolClient, book: Book): Promise<Loan|null> {
  const { rows } = await client.query({
    text: `
      SELECT * FROM loans
      WHERE book_id = $1`,
    values: [book.id]
  })

  return oneOrNone(rows.map(castLoan))
}
