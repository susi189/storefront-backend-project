import { User, UserStore } from "../user";

const store = new UserStore();

describe("Test for User Model", () => {
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
      firstname: "Max",
      lastname: "Musterman",
      passworddigest: "12345",
    });
    expect(result).toEqual({
      id: 1,
      firstname: "Max",
      lastname: "Musterman",
      passworddigest: "12345",
    });
  });

  it("index method should return an array of products", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        firstname: "Max",
        lastname: "Musterman",
        passworddigest: "12345",
      },
    ]);
  });

  it("show method should return a product with given id", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      firstname: "Max",
      lastname: "Musterman",
      passworddigest: "12345",
    });
  });
});
