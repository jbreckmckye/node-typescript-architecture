import { $adapter as $postgres } from '@adapters/postgres'
import { $adapter as $rabbitmq } from '@adapters/rabbitmq'
import { binding } from '@bindings/express'
import { createLibrary, mergeAdapters } from '@lib'

async function makeApp () {
  const adapters = mergeAdapters(
    await $postgres(),
    await $rabbitmq()
  )

  const library = createLibrary(adapters)

  binding(library)
}

makeApp()
