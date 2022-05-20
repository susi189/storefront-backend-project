# Storefront Backend

This project is part of the Full Stack Nanodegree Program at Udacity. In this project I build a backend for a store based on given [requirements](https://github.com/susi189/storefront-backend-project/blob/master/REQUIREMENTS.md). Here I focus mainly on:

- Building a RESTful API with Node.js/Express.
- Working with Databases; here PostgreSQL.
- Unit testing

## Technical overview

1. Languages: Typescript
2. Libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- bcrypt for password hashing
- jasmine from npm for testing

3. Docker to access the database

## Setup

To be able to run this project you need to have [Node.js](https://nodejs.org/en/download/) installed on your local machine.

Then run `npm install` to automatically install all the dependencies.

### Database

To be able to access the database you need to have PostgreSQL installed locally, or access the postgres database via Docker. In this project I used Docker based on the docker-compose.yml:

```
version: "3.9"

services:
  postgres:
    image: postgres
    ports:
      - "5432:5432"
    env_file:
      - .env
    volumes:
      - "postgres:/var/lib/postgresql/data"

volumes:
  postgres:

```

### Environment variables

As it is a good practice not to expose the .env file, it was added to .gitignore file. However as this is a practice project I provided the environment variables here:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=pasword123
ENV=test // OR ENV=dev
BCRYPT_PASSWORD=udacity
SALT_ROUNDS=10
TOKEN_SECRET=mysecret

```

### Scripts:

- npm test - for testing
- npm start - for starting a server

For more detailed information about this project check out the [REQUIREMENTS.md file](https://github.com/susi189/storefront-backend-project/blob/master/REQUIREMENTS.md)
