-- Basic setup

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tables

CREATE TABLE IF NOT EXISTS users (
  user_id         UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            text          NOT NULL,
  address_line1   text          NOT NULL,
  address_line2   text,
  postal_code     text          NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
  book_id         UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            text          NOT NULL
);

CREATE TABLE IF NOT EXISTS loan (
  loan_id         UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID          REFERENCES users (user_id),
  book_id         UUID          REFERENCES books (book_id),
  returned        boolean       DEFAULT FALSE
);
