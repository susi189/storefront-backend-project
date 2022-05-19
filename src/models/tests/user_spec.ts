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

  it("should have a authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });

  it("create method should insert a new user into the users table", async () => {
    const user = {
      firstname: "Max",
      lastname: "Musterman",
      email: "first@gmail.com",
      password: "1234",
    };
    const result = await store.create(user);
    expect(result).toEqual({
      id: result.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password_digest: result.password_digest,
    });
  });

  it("index method should return an array of users", async () => {
    const result = await store.index();
    expect(result).not.toBe([]);
  });

  it("show method should return a user with a given id", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      firstname: result.firstname,
      lastname: result.lastname,
      email: result.email,
      password_digest: result.password_digest,
    });
  });

  it("should authenticate a given user", async () => {
    const result = await store.authenticate("first@gmail.com", "1234");
    expect(result).not.toEqual(null);
  });
});
