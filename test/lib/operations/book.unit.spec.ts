import { $addBook } from '@lib/operations'
import { createMockCtx } from '@test/util/mockCtx'
import { BookInput } from '@lib/entities'

describe('The book operation', () => {
  let addBook: ReturnType<typeof $addBook>
  let mockCtx: ReturnType<typeof createMockCtx>

  const validInput: BookInput = {
    name: 'How to Cook for Forty Humans'
  }

  beforeEach(() => {
    mockCtx = createMockCtx()
    addBook = $addBook(mockCtx)
  })

  test('adds a book to the book repository', async () => {
    await addBook(validInput)
    expect(mockCtx.backend.bookRepository.add).toHaveBeenCalled()
  })

  test('emits an analytics event to our data warehouse', async () => {
    await addBook(validInput)
    expect(mockCtx.middleware.events.onBookAdded).toHaveBeenCalled()
  })
})
