const { User } = require("../../src/app/models");
const request = require("supertest");
const app = require("../../src/app");
const truncate = require('../utils/truncate');

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();

    this.user = await User.create({
      name: "Jon doe",
      email: "JonDoe@mail.com",
      password: "123456",
    });
  })

  it("Authentication with valid credentials", async () => {
    const response = await request(app)
      .post("/sessions")
      .send({ email: "JonDoe@mail.com", password: "123456" });

    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {

    const response = await request(app)
      .post("/sessions")
      .send({ email: "JonDoe@mail.com", password: "12345" });

    expect(response.status).toBe(401);
  });

  it("Authentication with valid credentials", async () => {
    const response = await request(app)
      .post("/sessions")
      .send({ email: "JonDoe@mail.com", password: "123456" });

    expect(response.body).toHaveProperty("token");
  });

  it('should be able to access privated routes when authenticated', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${this.user.generatedToken()}`);

      expect(response.status).toBe(200);
  });

  it('should not be able not acess private routes when jwt token is not provided', async () => {
    
    const response = await request(app)
      .get('/dashboard');

      expect(response.status).toBe(401);
  });

  it('should be able to access privated routes when authenticated', async () => {
    
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 12341234`);

      expect(response.status).toBe(401);
  });
});

