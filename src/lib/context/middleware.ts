import * as Events from '../events'

export type Middleware = {
  onUserAdded:  (u: Events.UserAdded)  => Promise<void>,
  onBookLoaned: (b: Events.BookLoaned) => Promise<void>
}
