import { Order, OrderStore } from "../order";

const store = new OrderStore();

describe("Test for Order Model", () => {
  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("show method should return a product with given id", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: "my product",
      price: "1.99",
    });
  });
});
