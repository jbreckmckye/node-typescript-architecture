import * as amqp from 'amqplib'
import { Ctx } from '@lib'

export async function $adapter (): Promise<Ctx.ContextAdapter> {
  const connection = await amqp.connect('amqp://localhost')
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
