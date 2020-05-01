import { BookStore, LoanStore, UserStore } from '@lib/context/backend'
import { EventHandlers } from '@lib/context/middleware'
import { Context } from '@lib/context'

export function createMockCtx (): Context {
  const bookRepository: BookStore = {
    add:            jest.fn(),
    delete:         jest.fn(),
    find:           jest.fn()
  }

  const userRepository: UserStore = {
    add:            jest.fn(),
    delete:         jest.fn(),
    find:           jest.fn()
  }

  const loanRepository: LoanStore = {
    takeLoan:       jest.fn(),
    endLoan:        jest.fn(),
    getBookLoaner:  jest.fn(),
    getUserLoans:   jest.fn()
  }

  const events: EventHandlers = {
    onUserAdded:    jest.fn(),
    onUserDeleted:  jest.fn(),
    onLoanMade:     jest.fn(),
    onBookAdded:    jest.fn()
  }

  return {
    backend: {
      bookRepository,
      userRepository,
      loanRepository
    },
    middleware: {
      events
    }
  }
}
