const request = require("supertest");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");

require("dotenv").config();
const { User, newUser } = require("../model/__mocks__/data");
const app = require("../app");

const SECRET_KEY = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock("../model/users.js");

describe("Testing the route api/users", () => {
  // describe('Testing not found route', () => {
  //   it('Should return Not found with 404 status', async done => {
  //     const res = await request(app).get('/api/users/1');
  //     expect(res.status).toEqual(404);
  //     done();
  //   });
  // });

  // it('Registration without required fields should return 400 status', async done => {
  //   const res = await request(app)
  //     .post('/api/users/auth/register')
  //     .send({ email: '', password: '' })
  //     .set('Accept', 'application/json');
  //   expect(res.status).toEqual(400);
  //   done();
  // });
  describe("should handle register", () => {
    it("should return 201 registration", async (done) => {
      const res = await request(app)
        .post("/api/users/auth/register")
        .send(newUser)
        .set("Accept", "application/json");

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      done();
    });

    it("should return 409 registration -  email already used", async (done) => {
      const res = await request(app)
        .post("/api/users/auth/register")
        .send(newUser)
        .set("Accept", "application/json");

      expect(res.status).toEqual(409);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe("should handle login", () => {
    it("should return 200 login", async (done) => {
      const res = await request(app)
        .post("/api/users/auth/login")
        .send(newUser)
        .set("Accept", "application/json");

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      done();
    });

    it("should return 401 login", async (done) => {
      const res = await request(app)
        .post("/api/users/auth/login")
        .send({ email: "fake@test.com", password: "1234567" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(401);
      expect(res.body).toBeDefined();
      done();
    });

    it("should return 400 status - empty field", async (done) => {
      const res = await request(app)
        .post("/api/users/auth/login")
        .send({ email: "", password: "" })
        .set("Accept", "application/json");
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe("should handle logout", () => {
    it("should return 204 logout", async (done) => {
      const res = await request(app)
        .post("/api/users/auth/logout")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(204);
      done();
    });
  });

  describe("should handle current user data by token", () => {
    it("should return 200 status", async (done) => {
      const res = await request(app)
        .get("/api/users/")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      done();
    });

    it("should return 401 status", async (done) => {
      const res = await request(app)
        .get("/api/users/")
        .set("Authorization", `Bearer ${123}`);
      expect(res.status).toEqual(401);
      done();
    });
  });

  // describe("Testing update subscription", () => {
  //   it("Update subscription success should return 200 status", async (done) => {
  //     const res = await request(app)
  //       .patch("/api/users")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ subscription: "free" });
  //     expect(res.status).toEqual(200);
  //     done();
  //   });

  //   it("Update subscription validation error should return 400 status", async (done) => {
  //     const res = await request(app)
  //       .patch("/api/users")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ subscription: "abc" });
  //     expect(res.status).toEqual(400);
  //     done();
  //   });

  //   it("Update subscription unauthorized error should return 401 status", async (done) => {
  //     const res = await request(app)
  //       .patch("/api/users")
  //       .set("Authorization", `Bearer ${123}`)
  //       .send({ subscription: "free" });
  //     expect(res.status).toEqual(401);
  //     done();
  //   });
  // });

  // describe("Testing user avatar upload", () => {
  //   it("Upload success should return 200 status", async (done) => {
  //     const buffer = await fs.readFile("./test/default.png");
  //     const res = await request(app)
  //       .patch("/api/users/avatars")
  //       .set("Authorization", `Bearer ${token}`)
  //       .attach("avatar", buffer, "default.png");
  //     expect(res.status).toEqual(200);
  //     expect(res.body).toBeDefined();
  //     expect(res.body.data).toHaveProperty("avatarUrl");
  //     done();
  //   });

  //   it("Upload unauthorized error should return 401 status", async (done) => {
  //     const buffer = await fs.readFile("./test/default.png");
  //     const res = await request(app)
  //       .patch("/api/users/avatars")
  //       .set("Authorization", `Bearer ${123}`)
  //       .attach("avatar", buffer, "default.png");
  //     expect(res.status).toEqual(401);
  //     done();
  //   });
  // });
});
