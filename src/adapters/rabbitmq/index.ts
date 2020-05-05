import * as amqp from 'amqplib'
import { Ctx } from '@lib'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function $adapter (): Promise<Ctx.ContextAdapter> {
  const connection = await attemptConnection()
  const channel = await connection.createChannel()

  await channel.assertQueue('messages')

  const dispatchEvent = async (eventName: string, content: object) => {
    const payload = JSON.stringify({ eventName, ...content }, null, 2)
    channel.sendToQueue('messages', Buffer.from(payload))
  }

  const events: Ctx.EventsCtx = {
    onUserAdded: (event) => dispatchEvent('userAdded', event),
    onUserDeleted: (event) => dispatchEvent('userDeleted', event),
    onLoanMade: (event) => dispatchEvent('loanMade', event),
    onBookAdded: (event) => dispatchEvent('bookAdded', event)
  }

  return async function adapter <I, O> (op: Ctx.Operation<I, O>) {
    return {
      op,
      ctx: { events }
    }
  }
}

async function attemptConnection (count: number = 6): Promise<amqp.Connection> {
  try {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672')
    console.log('Connected to AMQP')

    return connection

  } catch (err) {
    if (!count) {
      console.log('AMQP connection failed')
      throw err

    } else {
      console.log('Retrying AMQP connection in 5 seconds...')
      await wait(5000)
      return await attemptConnection(count - 1)
    }
  }
}
