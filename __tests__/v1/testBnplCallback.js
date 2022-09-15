process.env.CONTEXT_ENV = 'Jest';

const request = require("supertest");
const app = require("../../app");
const {DEFAULT_PATH, STANDARD_SCOPES} = require("../../utils/constants");
const TestConfig = require("../utils/testConfig");

const prefix = "/v1"

describe(`Test ${DEFAULT_PATH.BNPL_COMPLETION_CALLBACK} path`, () => {
  test("It should respond the GET method", async () => {
    const res = await request(app).get(`${prefix}${DEFAULT_PATH.BNPL_COMPLETION_CALLBACK}`).send()
    expect(res.statusCode).toBe(302);
  });
});
