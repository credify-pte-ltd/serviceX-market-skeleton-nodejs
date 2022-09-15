const request = require("supertest");
const app = require("../../app");

const prefix = "/v1"

describe("Test demo-user path", () => {
  test("It should respond the GET method", async () => {
    const res = await request(app).get(`${prefix}/demo-user`)
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBe(null)
  });
});
