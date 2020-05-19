# Project structure

Each directory represents a key component of NTA:

- The **lib** contains the 'core' domain code, and describes what types exist in the system (`entities`) and what a user can do with them (`operations`)
- The **adapters** provide functions to help the lib's operations achieve side effects
- The **bindings** take a lib plus adapters and make it responsive to messages from the outside world
- Each folder in apps combines the lib with adapters and a binding to make something runnable

You can find out more in the [docs page on project structure](https://jbreckmckye.gitbook.io/node-ts-architecture/project-structure).