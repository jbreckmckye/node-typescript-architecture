import { v4 as uuid } from 'uuid'
import { MemoryDB } from '../db'
import { Book, Loan, LoanInput, castLoan, User } from '@lib/entities'

export async function takeLoan (db: MemoryDB, input: LoanInput): Promise<Loan> {
  const loan = castLoan({
    ...input,
    returned: false,
    id: uuid()
  })

  db.loans.add(loan)
  return loan
}

export async function endLoan (db: MemoryDB, input: Loan): Promise<Loan> {
  for (const loan of db.loans) {
    if (loan.id === input.id) {
      db.loans.delete(loan)
      db.loans.add({
        ...loan,
        returned: true
      })
      return loan
    }
  }
  throw new Error('No loan found in set')
}

export async function getUserLoans (db: MemoryDB, input: User): Promise<Loan[]> {
  const loans = Array.from(db.loans)
  return loans.filter(loan => loan.userId === input.id && loan.returned === false)
}

export async function getLoan (db: MemoryDB, input: Book): Promise<Loan|null> {
  for (const loan of db.loans) {
    if (loan.bookId === input.id && loan.returned == false) {
      return loan
    }
  }
  return null
}
