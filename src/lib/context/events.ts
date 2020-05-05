import * as Events from '../events'

export type EventsCtx = {
  onUserAdded:   (u: Events.UserAdded)    => Promise<void>,
  onUserDeleted: (u: Events.UserDeleted)  => Promise<void>,
  onLoanMade:    (l: Events.LoanMade)     => Promise<void>,
  onBookAdded:   (b: Events.BookAdded)    => Promise<void>
}
