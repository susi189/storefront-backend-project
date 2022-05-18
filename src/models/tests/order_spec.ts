import { Order, OrderStore } from "../order";

const store = new OrderStore();

describe("Test for Order Model", () => {
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have select orders method", () => {
    expect(store.selectOrders).toBeDefined();
  });

  it("create method should insert a new order into the orders table", async () => {
    const result = await store.create({
      status: "active",
      uid: 1,
    });
    expect(result).toEqual({
      id: result.id,
      status: "active",
      uid: 1,
    });
  });

  it("selectOrders should return orders by user", async () => {
    const result = await store.selectOrders(1);
    expect(result).not.toEqual([]);
  });
});
