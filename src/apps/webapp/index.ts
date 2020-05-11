import { $adapter as $postgres } from '@adapters/postgres'
import { $adapter as $rabbitmq } from '@adapters/rabbitmq'
import { binding } from '@bindings/express'
import { createLibrary, mergeAdapters } from '@lib'

// An app is an executable and made up of three parts:
//
// 1. The LIBRARY - this represents entities and operations in the domain
//    (the business logic)
//
// 2. ADAPTERS - these are dependencies of the library injected into it at
//    runtime. They can include things like databases or HTTP services.
//
// 3. BINDINGS - these take a library plus adapters and bind it to events
//    coming from the world, e.g. HTTP requests or messages on an event bus

async function makeApp () {
  // Note there is a naming convention in this project where '$foo' is a
  // function that itself returns a function 'foo'

  // Prepare the adapters
  const postgres = await $postgres()
  const rabbitmq = await $rabbitmq()

  // Combine the adapters
  const adapters = mergeAdapters(
    postgres,
    rabbitmq
  )

  // Pass adapters into the library
  const library = createLibrary(adapters)

  // Bind incoming HTTP requests to our library
  binding(library)
}

makeApp()
