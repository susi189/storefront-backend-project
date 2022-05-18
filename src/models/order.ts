import client from "../database";

export type Order = {
  id?: number | undefined;
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

  async selectOrders(userId: number): Promise<Order[]> {
    try {
      const connect = await client.connect();
      const sql = "SELECT*FROM orders WHERE uid=($1) AND status=active";
      const result = await connect.query(sql, [userId]);
      const orders = result.rows[0];
      connect.release();
      return orders;
    } catch (err) {
      throw new Error(
        `Could not find orders for user ${userId}. Error: ${err}`
      );
    }
  }
}
