import { Pool, PoolClient } from 'pg'

export type DbFn <I, O> = (client: PoolClient, input: I) => Promise<O>

export function createConnectionPool () {
  return new Pool({
    max: 5,
    connectionTimeoutMillis: 100,
    idleTimeoutMillis: 500,
    host: 'postgres',
    user: 'username',
    password: 'password',
    database: 'db',
    port: 5432
  })
}

// This is a simplified function for wrapping a callback in a database transaction.
// If the callback throws an error, we roll back any changes to the database.
// This includes non-DB errors being thrown - to prevent inconsistencies across the system

export async function wrapTransaction <T> (client: PoolClient, cb: () => Promise<T>) {
  try {
    await client.query('BEGIN')
    const result = await cb()
    await client.query('COMMIT')
    return result

  } catch (e) {
    await client.query('ROLLBACK')
    throw e

  } finally {
    client.release()
  }
}

// Take a repository function of signature (client, input) => output and a (client) and returns a function (input) => output

export function withClient <I, O> (client: PoolClient, fn: DbFn<I, O>) {
  return function (input: I): Promise<O> {
    return fn(client, input)
  }
}
