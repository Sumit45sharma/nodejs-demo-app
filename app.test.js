const request = require("supertest");
const app = require("./app");

describe("Node.js Demo App", () => {
  describe("GET /", () => {
    it("should return welcome message", async () => {
      const response = await request(app).get("/").expect(200);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Welcome to Node.js CI/CD Demo App!");
      expect(response.body).toHaveProperty("version", "1.0.0");
      expect(response.body).toHaveProperty("timestamp");
    });
  });

  describe("GET /health", () => {
    it("should return health status", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.body).toHaveProperty("status", "healthy");
      expect(response.body).toHaveProperty("uptime");
      expect(response.body).toHaveProperty("timestamp");
    });
  });

  describe("GET /api/users", () => {
    it("should return users list", async () => {
      const response = await request(app).get("/api/users").expect(200);

      expect(response.body).toHaveProperty("users");
      expect(response.body).toHaveProperty("count");
      expect(Array.isArray(response.body.users)).toBe(true);
      expect(response.body.count).toBe(2);
    });

    it("should return users with correct structure", async () => {
      const response = await request(app).get("/api/users").expect(200);

      const users = response.body.users;
      expect(users[0]).toHaveProperty("id");
      expect(users[0]).toHaveProperty("name");
      expect(users[0]).toHaveProperty("email");
    });
  });

  describe("GET /nonexistent", () => {
    it("should return 404 for unknown routes", async () => {
      const response = await request(app).get("/nonexistent").expect(404);

      expect(response.body).toHaveProperty("error", "Route not found");
    });
  });
});
