process.env.CONTEXT_ENV = 'Jest';

const request = require("supertest");
const app = require("../../app");
const db = require("../../database/models");
const {DEFAULT_PATH} = require("../../utils/constants");
// const {fetchUser, fetchCommitment} = require("../../dataInteraction");
const TestConfig = require("../utils/testConfig");

const prefix = "/v1"

describe(`Test ${DEFAULT_PATH.PUSH_CLAIMS} path`, () => {
  test("It should respond the POST method", async () => {
    const body = {
      id: TestConfig.TEST_USER_ID,
      credify_id: TestConfig.TEST_CREDIFY_ID,
    };

    const res = await request(app).post(`${prefix}${DEFAULT_PATH.PUSH_CLAIMS}`).send(body)
    expect(res.statusCode).toBe(200);
    // Response body can be empty.

    // Credify ID needs to be recorded.
    // const u = await fetchUser(db, TestConfig.TEST_USER_ID, TestConfig.TEST_CREDIFY_ID);
    // expect(u.credifyId).not.toBe(null);

    // Commitment needs to be recorded.
    // const c = await fetchCommitment(db, TestConfig.TEST_CREDIFY_ID);
    // expect(c).not.toBe(null);
  }, 8000);
});
