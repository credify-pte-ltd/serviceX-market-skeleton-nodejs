process.env.CONTEXT_ENV = 'Jest';

const request = require("supertest");
const app = require("../../app");
const {DEFAULT_PATH} = require("../../utils/constants");
const TestConfig = require("../utils/testConfig");

const prefix = "/v1"

describe(`Test ${DEFAULT_PATH.OFFERS_FILTERING} path`, () => {
  test("It should respond the POST method", async () => {

    const body = {
      credify_id: TestConfig.TEST_CREDIFY_ID,
      local_id: TestConfig.TEST_USER_ID,
      offers: TestConfig.OFFERS,
    }

    const res = await request(app).post(`${prefix}${DEFAULT_PATH.OFFERS_FILTERING}`).send(body)

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("offers");
    expect(res.body.data.offers).toBeInstanceOf(Array);
    expect(res.body.data.offers.length).toBeLessThanOrEqual(body.offers.length)

    res.body.data.offers.forEach((offer) => {
      expect(offer).toHaveProperty("evaluation_result");
      expect(offer.evaluation_result).toHaveProperty("rank");
      expect(offer.evaluation_result).toHaveProperty("used_scopes");
      expect(offer.evaluation_result).toHaveProperty("requested_scopes");
      expect(offer.evaluation_result.rank).toBeGreaterThanOrEqual(1);
    })
  });
});
