import { v4 as uuid } from 'uuid'
import { MemoryDB } from '../db'
import { User, UserInput, castUser } from '@lib/entities'
import { UUID } from 'io-ts-types/lib/UUID'

export async function add (db: MemoryDB, input: UserInput): Promise<User> {
  const user = castUser({
    ...input,
    id: uuid()
  })

  db.users.add(user)
  return user
}

export async function find (db: MemoryDB, input: UUID): Promise<User|null> {
  for (const user of db.users) {
    if (user.id === input) return user
  }
  return null
}

export async function remove (db: MemoryDB, input: User): Promise<void> {
  for (const user of db.users) {
    if (user.id === input.id) {
      db.users.delete(user)
      return
    }
  }
}
