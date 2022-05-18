**Set up information**

_Database:_

- This project is using Docker based on the docker-compose.yml (included in the project)

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

- Environment variables

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

NOTE for setup with docker: while setting up the project with docker, somehow I had to name the POSTGRES_DB=test_db instead of POSTGRES_DB=shopping otherwise I would have issues with connecting to postgres

_Scripts:_
npm test - for testing
npm start - for starting a server

NOTE to test: I came across issues with test script, the database was not dropped after successful test, this is why I dropped the DB (DROP DATABASE shopping_test;) manually and created it manually before starting a new round of tests (CREATE DATABASE shopping_test;)
