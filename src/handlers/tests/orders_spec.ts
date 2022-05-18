import app from "../../server";
import supertest from "supertest";

const request = supertest(app);

const testUser = {
  id: 1,
  firstname: "Max",
  lastname: "Mustermann",
  email: "max.mustermann@gmail.com",
  password: "1234",
};

describe("Tests for Orders Handler", () => {
  it("POST /create responds with an error when no token provided ", async () => {
    const response = await request.post("/orders");
    expect(response.body).toBe("Access denied, invalid token");
  });

  it("POST /create responds with status 200 when token present", async () => {
    const getToken = await request.post("/users").send(testUser);
    const token = getToken.body;
    const response = await request
      .post("/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("GET /selectOrders should respond with status 200 with tocken", async () => {
    const getToken = await request.post("/users").send(testUser);
    const token = getToken.body;
    const response = await request
      .get("/orders/users/1/current")
      .set("Authorization", `Bearer ${token}`);
    console.log(response.body);
    expect(response.status).toBe(200);
  });
});
