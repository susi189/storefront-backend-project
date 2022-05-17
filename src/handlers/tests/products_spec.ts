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

describe("Tests for Products Handler", () => {
  it("GET /index responds with status 200", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("POST /create responds with an error when no token provided ", async () => {
    const response = await request.post("/products");
    expect(response.body).toBe("Access denied, invalid token");
  });

  it("POST /create responds with status 200 when token present", async () => {
    const getToken = await request.post("/users").send(testUser);
    const token = getToken.body;
    const response = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("GET /show responds with status 200 by given id", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
  });
});
