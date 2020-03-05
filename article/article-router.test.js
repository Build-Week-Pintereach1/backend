const request = require("supertest");

const server = require("../api/server.js");
const db = require("../db/db-config.js");

describe("article router", () => {
  it("should run the tests", () => {
    expect(true).toBe(true);
  });

  let token;

  beforeAll(() => {
    request(server)
      .post("/api/login")
      .send({
        username: "lily",
        password: process.env.USER_1
      })
      .end((err, res) => {
        token = res.body.token;
      });

    return db.seed.run();
  });

  describe("GET /api/articles", () => {
    it("should return an array of articles which have categories", async () => {
      const res = await request(server)
        .get("/api/articles")
        .set("Authorization", `${token}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body[0].categories)).toBe(true);
    });
  });

  describe("GET /api/articles/:id", () => {
    it("should return 200 OK", async () => {
      const res = await request(server)
        .get("/api/articles/1")
        .set("Authorization", `${token}`);
      expect(res.status).toBe(200);
    });

    it("should return article where id: 1", async () => {
      const res = await request(server)
        .get("/api/articles/1")
        .set("Authorization", `${token}`);
      expect(res.body.title).toBe(
        "Seed Knex PostgreSQL Database with JSON Data"
      );
    });
  });

  describe("POST /api/articles", () => {
    it("should return an article with fields populated by LinkPreview", async () => {
      const res = await request(server)
        .post("/api/articles")
        .send({
          url: "https://www.google.com"
        })
        .set("Authorization", `${token}`);
      expect(res.status).toBe(201);
      expect(typeof res.body.articles[4] === "object").toBe(true);
    });
  });

  describe("PUT /api/articles/:id", () => {
    it("should return updated article", async () => {
      const res = await request(server)
        .put("/api/articles/2")
        .send({
          notes: "Will read this tomorrow"
        })
        .set("Authorization", `${token}`);
      expect(res.status).toBe(200);
      expect(res.body.notes).toBe("Will read this tomorrow");
    });
  });

  describe("DELETE /api/articles/:id", () => {
    it("returned articles should not include saved article", async () => {
      const res = await request(server)
        .delete("/api/articles/4")
        .set("Authorization", `${token}`);
      expect(res.status).toBe(200);
      expect(res.body.filter(article => article.id === 4).length).toBe(0);
    });
  });
});
