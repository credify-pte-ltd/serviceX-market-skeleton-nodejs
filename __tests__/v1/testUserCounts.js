process.env.CONTEXT_ENV = 'Jest';

const request = require("supertest");
const app = require("../../app");
const {DEFAULT_PATH} = require("../../utils/constants");

const prefix = "/v1"

describe(`Test ${DEFAULT_PATH.USER_COUNTS} path`, () => {
  test("It should respond the POST method", async () => {

    const body = {
      ids: [],
      conditions: [],
      required_custom_scopes: []
    }

    const res = await request(app).post(`${prefix}${DEFAULT_PATH.USER_COUNTS}`).send(body)
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("counts");
    expect(res.body.data.counts).toBeInstanceOf(Array);
  });
});
