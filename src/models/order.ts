import client from "../database";

export type Order = {
  id?: number;
  status: string;
  uid: number;
};

export class OrderStore {
  async create(o: Order): Promise<Order> {
    try {
      const connect = await client.connect();
      const sql = "INSERT INTO orders (status, uid) VALUES($1, $2) RETURNING *";
      const result = await connect.query(sql, [o.status, o.uid]);
      const order = {
        id: result.rows[0].id,
        status: result.rows[0].status,
        uid: result.rows[0].uid,
      };
      connect.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create a new order. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    try {
      const connect = await client.connect();
      const sql =
        "INSERT INTO order_products (quantity, oid, pid) VALUES ($1, $2, $3) RETURNING *";
      const result = await connect.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];
      connect.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}. Error: ${err}`
      );
    }
  }
}
