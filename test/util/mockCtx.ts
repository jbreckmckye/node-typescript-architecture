import { BackendCtx, BookStore, LoanStore, UserStore } from '@lib/context/backend'
import { Context, EventsCtx } from '@lib/context'

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
    getLoan:        jest.fn(),
    getUserLoans:   jest.fn()
  }

  const backend: BackendCtx = {
    bookStore: bookRepository,
    userStore: userRepository,
    loanStore: loanRepository
  }

  const events: EventsCtx = {
    onUserAdded:    jest.fn(),
    onUserDeleted:  jest.fn(),
    onLoanMade:     jest.fn(),
    onBookAdded:    jest.fn()
  }

  return {
    backend,
    events
  }
}
