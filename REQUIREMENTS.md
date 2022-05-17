# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  GET http://localhost:3000/products
- Show
  GET http://localhost:3000/products/:id
- Create [token required]
  POST http://localhost:3000/products
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
  GET http://localhost:3000/users
- Show [token required]
  GET http://localhost:3000/users/:id
- Create N[token required]
  POST http://localhost:3000/users

#### Orders

- Current Order by user (args: user id)[token required]
  POST http://localhost:3000/orders/
  POST http://localhost:3000/orders/id/products
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

             List of relations

Schema | Name | Type | Owner  
--------+----------------+-------+----------
public | migrations | table | postgres
public | order_products | table | postgres
public | orders | table | postgres
public | products | table | postgres
public | users | table | postgres

#### Product

CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(100), price decimal);

shopping=# SELECT \* FROM products;
id | name | price
----+------+-------
(0 rows)

- id
- name
- price
- [OPTIONAL] category

#### User

```
CREATE TABLE users (id SERIAL PRIMARY KEY, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR, password_digest VARCHAR);
```

shopping=# SELECT \* FROM users;
id | first_name | last_name | password_digest
----+------------+-----------+-----------------
(0 rows)

- id
- firstName
- lastName
- password

#### Orders

shopping=# SELECT \* FROM orders;
id | status | uid
----+--------+-----
(0 rows)

shopping=# SELECT \* FROM order_products;
id | quantity | oid | pid
----+----------+-----+-----
(0 rows)

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
