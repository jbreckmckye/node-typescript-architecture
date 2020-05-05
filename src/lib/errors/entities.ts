export class EntityDecodeError extends Error {
  constructor (failureMsg: string) {
    super(`Unable to decode entity as expected type. Mismatch was: ${failureMsg}`)
  }
}
