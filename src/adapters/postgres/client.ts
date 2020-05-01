import { Pool, PoolClient } from 'pg'

export type ClientFn <T> = (client: PoolClient) => Promise<T>
export type GetClient = () => Promise<PoolClient>

export function $getClient (): GetClient {
  const pool = new Pool({
    max: 5,
    connectionTimeoutMillis: 100,
    idleTimeoutMillis: 500
  })

  return function getClient () {
    return pool.connect()
  }
}

export async function wrapTransaction <T> (client: PoolClient, cb: ClientFn<T>) {
  try {
    await client.query('BEGIN')
    const result = await cb(client)
    await client.query('COMMIT')
    return result

  } catch (e) {
    await client.query('ROLLBACK')
    throw e

  } finally {
    client.release()
  }
}
