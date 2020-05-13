# Node TypeScript Architecture

(Work in progress, come back soon!)

![Logo](docs/logo.png)

[Want the docs? Here's the GitBook](https://jbreckmckye.gitbook.io/node-ts-architecture/).

This project demonstrates an opinionated architecture for writing Node.js applications, particularly in TypeScript (but
will work with plain JS too).

It offers a project structure, naming conventions, example code and recommended habits for building extendable, readable,
reliable systems.

You can use this architecture to build backend apps, CLI programs, REST APIs, GraphQL boxes or even use it as part of an SPA.

In this repo the architecture is used to build both an Express app with Postgres transactions and RabbitMQ events, and a
Vorpal.js CLI app using an in-memory database - using the same core business logic.

## Getting started

Your best bet is to read the [documentation](https://jbreckmckye.gitbook.io/node-ts-architecture/).

If you're impatient, though, you can dive straight into the codebase. I would look at the webapp example and then work
backwards from there.

## What kind of architecture is this?

NTA is loosely based on the 'onion architecture', which also can go by the name 'clean architecture', 'hexagon architecture'
or 'ports and adapters'.

The key idea is that you start with your domain entities and operations on them, then inject dependencies on things like
infrastructure, databases and HTTP. You make those parts depend on domain code and domain types, rather than the other way
round.

By doing this, you ensure two things: firstly, that changes in infrastructure (which is unstable) rarely bubble up to 
changes in the domain (which should be stable); and secondly, that you can swap out bits of infrastructure as needed. Want to
build a CLI app out of your web app code? With this kind of architecture, it's easy.
