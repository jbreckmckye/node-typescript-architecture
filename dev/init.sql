-- Basic setup

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tables

CREATE TABLE IF NOT EXISTS users (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            text          NOT NULL,
  address_line1   text          NOT NULL,
  address_line2   text,
  postal_code     text          NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            text          NOT NULL
);

CREATE TABLE IF NOT EXISTS loans (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID          NOT NULL REFERENCES users (id),
  book_id         UUID          NOT NULL REFERENCES books (id),
  returned        boolean       NOT NULL DEFAULT FALSE
);
