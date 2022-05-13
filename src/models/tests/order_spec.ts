import { Order, OrderStore } from "../order";

const store = new OrderStore();

describe("Test for Order Model", () => {
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("create method should insert a new order into the orders table", async () => {
    const result = await store.create({
      status: "active",
      uid: 2,
    });
    expect(result).toEqual({
      id: 1,
      status: "active",
      uid: 2,
    });
  });
});
