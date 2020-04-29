import { UUID } from 'io-ts-types/lib/UUID'
import { User, UserInput } from '../entities'
import { Context } from '../context'
import { UserDoesNotExist, UserHasOutstandingLoans } from '../errors'

export function $addUser (ctx: Context) {
  const {
    backend:    { userRepository },
    middleware: { events }
  } = ctx

  return async function addUser (userInput: UserInput): Promise<User> {
    const user = await userRepository.add(userInput)

    await events.onUserAdded({
      userId: user.id
    })

    return user
  }
}

export function $removeUser (ctx: Context) {
  const {
    backend:    { loanRepository, userRepository },
    middleware: { events }
  } = ctx

  return async function removeUser (userId: UUID): Promise<void> {
    const user = await userRepository.find(userId)
    if (user === null) {
      throw new UserDoesNotExist(userId)
    }

    const activeLoans = await loanRepository.getUserLoans(user)
    if (activeLoans.length) {
      throw new UserHasOutstandingLoans(user)
    }

    await userRepository.delete(user)

    await events.onUserDeleted({
      userId: user.id
    })
  }
}
