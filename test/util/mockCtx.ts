import { v4 as uuid } from 'uuid'
import { BackendCtx, BookStore, LoanStore, UserStore } from '@lib/context/backend'
import { Context, EventsCtx } from '@lib/context'
import { BookInput } from '@lib/entities'

export function createMockCtx (): Context {
  const bookRepository: BookStore = {
    add:            jest.fn().mockReturnValue({ id: uuid(), name: 'I am a Book'}),
    remove:         jest.fn(),
    find:           jest.fn()
  }

  const userRepository: UserStore = {
    add:            jest.fn(),
    remove:         jest.fn(),
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
    onBookAdded:    jest.fn(),
    onBookRemoved:  jest.fn()
  }

  return {
    backend,
    events
  }
}
