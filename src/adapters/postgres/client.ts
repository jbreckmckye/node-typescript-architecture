import { Pool, PoolClient } from 'pg'

export type DbFn <I, O> = (client: PoolClient, input: I) => Promise<O>

export function createConnectionPool () {
  return new Pool({
    max: 5,
    connectionTimeoutMillis: 100,
    idleTimeoutMillis: 500
  })
}

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

export function withClient <I, O> (client: PoolClient, fn: DbFn<I, O>) {
  return function (input: I): Promise<O> {
    return fn(client, input)
  }
}
