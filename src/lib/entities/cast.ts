import { Decoder } from 'io-ts'
import { reporter } from 'io-ts-reporters'
import { UUID } from 'io-ts-types/lib/UUID'

import { EntityDecodeError } from '@lib/errors'

export function $cast <T> (codec: Decoder<unknown, T>) {
  return function cast (input: unknown): T {
    const result = codec.decode(input)

    if ('left' in result) {
      const err = reporter(result)
      throw new EntityDecodeError(err.join('\n'))
    }

    return result.right
  }
}

export const castUUID = $cast(UUID)
