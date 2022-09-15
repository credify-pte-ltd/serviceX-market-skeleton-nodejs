process.env.CONTEXT_ENV = 'Jest';

const request = require("supertest");
const app = require("../../app");
const db = require("../../database/models");
const {DEFAULT_PATH, DISBURSEMENT_DOCS} = require("../../utils/constants");
const TestConfig = require("../utils/testConfig");

const prefix = "/v1"

describe(`Test ${DEFAULT_PATH.GET_BNPL_DISBURSEMENT_DOCS} path`, () => {
  test("It should respond the POST method", async () => {
    const paths = DEFAULT_PATH.GET_BNPL_DISBURSEMENT_DOCS.split(":orderId");
    const orderId = "c705f5bb-2e2f-4b90-a65d-633a3365f7de"

    const res = await request(app).post(`${prefix}${paths[0]}${orderId}${paths[1]}`).send({})
    expect(res.statusCode).toBe(200);
    const KEY_PREFIX = "bnpl_order"
    expect(res.body).toHaveProperty("_claim_names")
    expect(res.body._claim_names).toHaveProperty(`${KEY_PREFIX}:${orderId}:${DISBURSEMENT_DOCS.INVOICE}`)
    expect(res.body._claim_names).toHaveProperty(`${KEY_PREFIX}:${orderId}:${DISBURSEMENT_DOCS.INVOICE}:commitment`)
    expect(res.body._claim_names).toHaveProperty(`${KEY_PREFIX}:${orderId}:${DISBURSEMENT_DOCS.DOWN_PAYMENT}`)
    expect(res.body._claim_names).toHaveProperty(`${KEY_PREFIX}:${orderId}:${DISBURSEMENT_DOCS.DOWN_PAYMENT}:commitment`)
    expect(res.body._claim_names).toHaveProperty(`${KEY_PREFIX}:${orderId}:${DISBURSEMENT_DOCS.DELIVERY}`)
    expect(res.body._claim_names).toHaveProperty(`${KEY_PREFIX}:${orderId}:${DISBURSEMENT_DOCS.DELIVERY}:commitment`)
    expect(res.body).toHaveProperty("_claim_sources")
    const token = res.body._claim_sources[`${KEY_PREFIX}:${orderId}`].JWT
    expect(token).not.toBeUndefined()

  }, 15000);
});
