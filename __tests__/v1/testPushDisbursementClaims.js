process.env.CONTEXT_ENV = 'Jest';

const request = require("supertest");
const app = require("../../app");
const db = require("../../database/models");
const {DEFAULT_PATH} = require("../../utils/constants");
const TestConfig = require("../utils/testConfig");

const prefix = "/v1"

describe(`Test ${DEFAULT_PATH.PUSH_BNPL_DISBURSEMENT_CLAIMS} path`, () => {
  test("It should respond the POST method", async () => {
    const body = {
      order_id: "c705f5bb-2e2f-4b90-a65d-633a3365f7de",
      documents: {
        invoice: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        down_payment: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        delivery: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      }
    };

    const res = await request(app).post(`${prefix}${DEFAULT_PATH.PUSH_BNPL_DISBURSEMENT_CLAIMS}`).send(body)
    console.log(res.body)
    expect(res.statusCode).toBe(200);
    // Response body can be empty.

    // document refs need to be recorded.
  }, 15000);
});
