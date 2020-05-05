import { $adapter as $postgres } from '@adapters/postgres'
import { $adapter as $rabbitmq } from '@adapters/rabbitmq'
import { binding } from '@bindings/express'
import { createLibrary, mergeAdapters } from '@lib'

async function makeApp () {
  const postgres = await $postgres()
  const rabbitmq = await $rabbitmq()

  const adapters = mergeAdapters(
    postgres,
    rabbitmq
  )

  const library = createLibrary(adapters)

  binding(library)
}

makeApp()
