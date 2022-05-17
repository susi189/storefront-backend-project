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

describe("Tests for Users Handler", () => {
  it("GET /index returns status 401 when no token provided", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(401);
  });

  it("GET /index returns status 200 with token", async () => {
    const getToken = await request.post("/users").send(testUser);
    const token = getToken.body;
    const response = await request
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("POST /create return a token when user is created", async () => {
    const response = await request.post("/users").send(testUser);
    expect(response.status).toBe(200);
  });

  it("GET /show returns status 200 by given id", async () => {
    const getToken = await request.post("/users").send(testUser);
    const token = getToken.body;
    const response = await request
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
