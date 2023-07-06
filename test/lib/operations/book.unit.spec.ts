import { addBook } from '@lib/operations'
import { createMockCtx } from '@test/util/mockCtx'
import { BookInput } from '@lib/entities'

describe('The book operation', () => {
  let mockCtx: ReturnType<typeof createMockCtx>

  const validInput: BookInput = {
    name: 'How to Cook for Forty Humans'
  }

  beforeEach(() => {
    mockCtx = createMockCtx()
  })

  test('adds a book to the book repository', async () => {
    await addBook(mockCtx, validInput)
    expect(mockCtx.backend.bookStore.add).toHaveBeenCalled()
  })

  test('emits an analytics event to our data warehouse', async () => {
    await addBook(mockCtx, validInput)
    expect(mockCtx.events.onBookAdded).toHaveBeenCalled()
  })
})
