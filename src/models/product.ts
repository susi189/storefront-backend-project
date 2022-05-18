import client from "../database";

// Set the types for product values
export type Product = {
  id?: number;
  name: string;
  price: string;
};

//set the methods for CRUD operations (index, show, create for products and users)

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connect = await client.connect();
      const sql = "SELECT*FROM products";
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product information. ERROR: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connect = await client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get information about product with id ${id}. ERROR: ${err}`
      );
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const connect = await client.connect();
      const sql =
        "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
      const result = await connect.query(sql, [p.name, p.price]);
      const product = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        price: result.rows[0].price,
      };
      connect.release();
      return product;
    } catch (err) {
      throw new Error(`Could not create a new product. ERROR: ${err}`);
    }
  }
}
