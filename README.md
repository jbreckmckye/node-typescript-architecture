# node-typescript-architecture

# Node TypeScript Architecture

## Overview

This is a library application. It supports the following operations:

- Books:
  - add
  - remove
- User accounts:
  - add
  - remove
  - update
- User transactions:
  - checkout
  - return
- Fines:
  - getting fines
  - paying fines

## Architectural principles

- Keep domain operations at the center, and agnostic of storage or UI
- Use (as much as possible) a functional style: stateless, declarative, with first-class functions

## Structure

LIB

- Entities
- Commands
- Queries
- Events
- Adapters

BACKENDS

- Database
- LocalFiles

MIDDLEWARES

- RabbitMQ
- LocalLogs

FRONTENDS

- Http
- POS

APPS

- Http
  (Http frontend, database backend, RabbitMQ middleware) -> Lib

- CLI
  (POS frontend, local file backend, localLog middleware) -> Lib

TESTS

 ...

 APP
 (test backend, test frontend, test middleware) -> Lib
