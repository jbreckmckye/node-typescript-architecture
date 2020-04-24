import { Decoder } from 'io-ts'
import { reporter } from 'io-ts-reporters'
import { UUID } from 'io-ts-types/lib/UUID'

export function $cast <T> (codec: Decoder<unknown, T>) {
  return function cast (input: unknown): T {
    const result = codec.decode(input)

    if ('left' in result) {
      const err = reporter(result)
      throw new Error(err.join('\n'))
    }

    return result.right
  }
}

export const castUUID = $cast(UUID)
