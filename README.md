# Node TypeScript Architecture

(Work in progress, come back soon!)

![Logo](docs/logo.png)

This project demonstrates an opinionated architecture for writing Node.js applications, particularly those in TypeScript (but
will work with plain JS too). It provides a project structure, naming conventions, example code and recommended habits for
building scalable, readable, robust systems.

You can use this architecture to build backend apps, CLI programs, REST APIs, GraphQL boxes or even use it as part of an SPA.

It's based off my own experiences writing more Node microservices and JavaScript programs than I can count - but it's just an
opinion, and the architecture is flexible. You can take individual parts without committing to the whole.

## How do I use it?

There's both sample code and documentation. If you're impatient you can dive straight into the commented code samples, but I'd
recommend reading the docs, as they provide context and a discussion of alternatives and tradeoffs.

## What kind of architecture is this?

NTA is loosely based on an 'onion architecture' pattern (sometimes called the 'clean architecture' or 'ports and adapters'),
decoupling core business logic from infrastructure concerns (like databases or HTTP libraries) by means of dependency injection.

"Dependency injection" might make some people nervous, evoking distant memories of clunky Java IOC frameworks and Angular.js DI magic.
Rest assured, NTA uses no frameworks, no containers, just a few simple functional programming capabilities provided by JavaScript.

(If you aren't familiar with functional programming in JavaScript, I'll talk you through that, too)

## What's in this repo?

As well as the documentation, this codebase comprises a 'library' containing business logic and several 'adapters' and
'bindings' for different dependencies like databases and HTTP frameworks, combined into two applications - showing how this
architecture lets you mix and match various components:

1. A 'webapp' that combines a Postgres database (with transactions), RabbitMQ events (for e.g. a microservice architecture), and an Express server
2. A 'cli' that combines a Vorpal.js CLI frontend with an in-memory database

The codebase is commented and the impatient reader is welcome to dive right into the code, starting with 
the `src/app` folders - but if you have time, start with the documentation.

## The example application

This project implements a simple 'community library' system. Users and books can be registered, and users can check out
and return books at their leisure. Users can be removed from the system, but only if they have no outstanding loans. To
keep things simple, I've left out things like dealines and paying fines.

The aim is to build an app that is small enough to be easily digested, but bigger than a simple 'todo' app that might leave
too many questions unanswered.

The project includes two apps you can spin up yourself - see the documentation for a how-to.

## NOTES FOR USERS

Connect 0.0.0.0 -p 5432 user=username pw=password database=db
