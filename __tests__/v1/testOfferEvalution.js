process.env.CONTEXT_ENV = 'Jest';

const request = require("supertest");
const app = require("../../app");
const {DEFAULT_PATH} = require("../../utils/constants");
const TestConfig = require("../utils/testConfig");

const prefix = "/v1"

describe(`Test ${DEFAULT_PATH.OFFER_EVALUATION} path`, () => {
  test("It should respond the POST method - with custom scope", async () => {

    const body = {
      credify_id: TestConfig.TEST_CREDIFY_ID,
      scopes: ["phone", "email", TestConfig.CUSTOM_SCOPE],
      conditions: TestConfig.CONDITIONS,
      required_custom_scopes: [],
    };

    const res = await request(app).post(`${prefix}${DEFAULT_PATH.OFFER_EVALUATION}`).send(body)
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("rank");
    expect(res.body.data).toHaveProperty("used_scopes");
    expect(res.body.data).toHaveProperty("requested_scopes");
    expect(res.body.data.rank).toEqual(expect.any(Number));
    expect(res.body.data.used_scopes).toBeInstanceOf(Array);
    expect(res.body.data.requested_scopes).toBeInstanceOf(Array);
  });

  test("It should respond the POST method - no custom scope", async () => {

    const body = {
      credify_id: TestConfig.TEST_CREDIFY_ID,
      scopes: ["phone", "email"],
      required_custom_scopes: [[TestConfig.CUSTOM_SCOPE], [TestConfig.CUSTOM_SCOPE]],
    };

    const res = await request(app).post(`${prefix}${DEFAULT_PATH.OFFER_EVALUATION}`).send(body)
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("rank");
    expect(res.body.data).toHaveProperty("used_scopes");
    expect(res.body.data).toHaveProperty("requested_scopes");
    expect(res.body.data.rank).toEqual(expect.any(Number));
    expect(res.body.data.used_scopes).toBeInstanceOf(Array);
    expect(res.body.data.requested_scopes).toBeInstanceOf(Array);
  });
});
