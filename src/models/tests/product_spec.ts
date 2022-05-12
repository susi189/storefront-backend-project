import { Product, ProductStore } from "../product";

const store = new ProductStore();

describe("Test for Product Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("create method should insert a new product into a product table", async () => {
    const result = await store.create({
      name: "my product",
      price: "1.99",
    });
    expect(result).toEqual({
      id: 1,
      name: "my product",
      price: "1.99",
    });
  });

  it("index method should return an array of products", async () => {
    const result = await store.index();
    expect(result).toEqual([{ id: 1, name: "my product", price: "1.99" }]);
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
