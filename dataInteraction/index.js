////////////////////////////////////////////
// REQUIRED IMPLEMENTATION
////////////////////////////////////////////

const {DEFAULT_PATH, DEFAULT_PATH_PREFIX, BNPL_ORDER_STATUS} = require("../utils/constants");
/**
 * This returns Credify scope object for a specified user.
 *
 * @param db DB object. This can be `undefined` upon your configuration.
 * @param localId string. Internal ID in your system
 * @param credifyId string. Credify ID
 * @param includingScopes string[]. If this is empty, it means all scopes.
 * @param withCommitments boolean. If this is true, `commitment` should be added into the scope object.
 * @returns {Promise<Object|null>}
 */
const fetchUserClaimObject = async (db, localId, credifyId, includingScopes, withCommitments) => {
  const user = await fetchUser(db, localId, credifyId)

  if (!user) {
    return null;
  }

  const shareableProfile = (process.env.APP_PROVIDING_BASIC_PROFILE || "").split(",").map((p) => p.toUpperCase());
  const claims = {};

  let commitments = undefined;
  if (withCommitments) {
    commitments = await fetchCommitment(db, credifyId);
  }

  // Add advanced scopes

  // NOTE: Please change this value according to what you have registered on Dashboard.
  const scopeName = "40f9a736-0d97-409b-a0f7-d23ebca20bde:loyalty-point-data-1653892708";
  if (includingScopes.length === 0 || includingScopes.includes(scopeName)) {
    claims[scopeName] = {
      "40f9a736-0d97-409b-a0f7-d23ebca20bde:amount-1653892708": user.loyaltyPoint,
      "40f9a736-0d97-409b-a0f7-d23ebca20bde:tier-1653892708": user.tier,
      [`${scopeName}:commitment`]: commitments ? commitments[scopeName] : undefined,
    }
  }

  // Add basic scopes. Object keys should remain same.

  if (includingScopes.length === 0 || includingScopes.includes("phone")) {
    if (shareableProfile.includes("PHONE")) {
      claims[`phone`] = {
        [`phone_number`]: `${user.phoneCountryCode}${user.phoneNumber}`,
        [`phone_commitment`]: commitments ? commitments[`phone`] : undefined,
      };
    }
  }

  if (includingScopes.length === 0 || includingScopes.includes("profile")) {
    if (shareableProfile.includes("NAME")) {
      claims[`profile`] = {
        [`family_name`]: `${user.lastName}`,
        [`given_name`]: `${user.firstName}`,
        [`profile_commitment`]: commitments ? commitments[`profile`] : undefined,
      };
    }
    if (shareableProfile.includes("DOB")) {
      claims[`profile`] = {
        ...claims[`profile`],
        [`birthdate`]: `${user.dob}`,
        [`profile_commitment`]: commitments ? commitments[`profile`] : undefined,
      };
    }
    if (shareableProfile.includes("GENDER")) {
      claims[`profile`] = {
        ...claims[`profile`],
        [`gender`]: `${user.gender}`,
        [`profile_commitment`]: commitments ? commitments[`profile`] : undefined,
      };
    }
  }

  if (includingScopes.length === 0 || includingScopes.includes("email")) {
    if (shareableProfile.includes("EMAIL")) {
      claims[`email`] = {
        [`email`]: `${user.email}`,
        [`email_commitment`]: commitments ? commitments[`email`] : undefined,
      };
    }
  }

  if (includingScopes.length === 0 || includingScopes.includes("address")) {
    if (shareableProfile.includes("ADDRESS")) {
      claims[`address`] = {
        address: {
          [`formatted`]: `${user.address}`,
        },
        [`address_commitment`]: commitments ? commitments[`address`] : undefined,
      };
    }
  }

  return claims
}

/**
 * This returns Credify verification info object
 * Please do not change the object structure
 *
 * @param db
 * @param credifyId
 * @returns {Promise<{phone: {country_code: (string|*), phone_number}, profile: {given_name: *, family_name: *}, email: {email}}>}
 */
const fetchVerificationInfo = async (db, credifyId) => {
  const user = await fetchUser(db, undefined, credifyId);
  return {
    phone: {
      phone_number: user.phoneNumber,
      country_code: user.phoneCountryCode,
    },
    email: {
      email: user.email,
    },
    profile: {
      family_name: user.lastName,
      given_name: user.firstName,
    }
  }
}

/**
 * This updates user's Credify ID
 * Please keep the CredifyID in your system for the later use.
 *
 * @param db
 * @param localId (optional)
 * @param credifyId
 * @returns {Promise<void>}
 */
const updateUserId = async (db, localId, credifyId) => {
  if (!credifyId) {
    throw new Error("This requires credify ID")
  }
  const u = await fetchUser(db, localId, credifyId);
  await u.update({ credifyId });
}

/**
 * This inserts/updates commitment model into DB
 * Please keep the commitment object for the later use.
 *
 * @param db
 * @param credifyId
 * @param commitments
 * @returns {Promise<void>}
 */
const upsertCommitments = async (db, credifyId, commitments) => {
  const obj = {
    credifyId,
    values: commitments
  }
  const c = await db.Commitment.findOne({ where: { credifyId } })
  if (c) {
    await c.update(obj)
  } else {
    await db.Commitment.create(obj)
  }
}

/**
 * This authenticates user by your own logic.
 * This is used in `push-claim` function.
 *
 * @param db
 * @param req (Express req object)
 * @returns {Promise<boolean>}
 */
const authenticateInternalUser = async (db, req) => {
  // Your service's specific authentication logic.
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 1000);
  });
}

/**
 * This authenticates API client by your own logic.
 * This is the internal authentication of microservice.
 *
 * @param db
 * @param req (Express req object)
 * @returns {Promise<boolean>}
 */
const authenticateInternalAPIClient = async (db, req) => {
  // Your service's specific authentication logic.
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 1000);
  });
}


/**
 * This returns BNPL completion callback page.
 * This is called from the FI context when all the actions necessary from the FI is completed.
 *
 * You may process order status in this callback and return a completed page URL.
 *
 * @param db
 * @param orderId
 * @return {Promise<string>}
 */
const getBNPLCallback = async (db, orderId) => {
  // Do something
  // Return callback URL
  return "https://bnpl-sample.netlify.app/callback"
}


/**
 * This is a domain of this server. This is necessary for webhook request validation.
 * @type {string}
 */
const apiDomain = "https://bnpl-demo.herokuapp.com"


/**
 * This function handles offer status update notified via webhook
 * This function may be called several times
 * @param db
 * @param payload
 * @returns {Promise<void>}
 */
const handleOfferStatusUpdate = async (db, payload) => {
  // Optional
  // Not necessary for BNPL use
}

/**
 * This function handles dispute completion notified via webhook
 * This function may be called several times
 * @param db
 * @param payload
 * @returns {Promise<void>}
 */
const handleDisputeCompletion = async (db, payload) => {
  // Optional
  // Not necessary for BNPL use
}

/**
 * This function handles order status update notified via webhook
 * This function may be called several times
 * @param db
 * @param orderId
 * @param status
 * @returns {Promise<void>}
 */
const handleOrderStatusUpdate = async (db, orderId, status) => {
  switch (status) {
    case BNPL_ORDER_STATUS.ORDER_STATUS_CANCELED:
      // Handle cancellation callback
      break
    case BNPL_ORDER_STATUS.ORDER_STATUS_APPROVED:
      // BNPL is approved.
      // Next step should be delivery.

      break
    case BNPL_ORDER_STATUS.ORDER_STATUS_DISBURSING:
      // This is a confirmation from a BNPL provider to disburse loan
      break
    case BNPL_ORDER_STATUS.ORDER_STATUS_PAID:
      // Disbursement is completed
      break
    default:
      break
  }

  const o = await db.Order.findOne({ where: { orderId } })
  if (o) {
    await o.update({ ...o, status })
  }
}

/**
 * This composes BNPL order creation payload.
 * Please check the detailed information below.
 *
 * @param req
 * @return {{totalAmount: *, orderLines: *, paymentRecipient: *, referenceId: *}}
 */
const buildOrderCreationPayload = (req) => {
  /**
   * {string}
   * @example "12345abc"
   */
  const referenceId = req.body.reference_id;

  /**
   * {Object}
   * @example
   * {
   *   "value": "9000000",
   *   "currency": "VND"
   * }
   */
  const totalAmount = req.body.total_amount; // This should be calculated on backend


  /**
   * {Array<Object>}
   * @example
   * [
   *   {
   *     "name": "iPhone 12",
   *     "reference_id": "iphone-12-black",
   *     "image_url": "https://www.apple.com/v/iphone-12/j/images/specs/finish_iphone12__ctf4hoqpbnki_large_2x.jpg",
   *     "product_url": "https://www.apple.com/vn/iphone-12/specs/",
   *     "quantity": 1,
   *     "unit_price": {
   *       "value": "9000000",
   *       "currency": "VND"
   *     },
   *     "subtotal": {
   *       "value": "9000000",
   *       "currency": "VND"
   *     },
   *     "measurement_unit": "EA"
   *   }
   * ]
   */
  const orderLines = req.body.order_lines;

  /**
   * {Object}
   * @example
   * {
   *   "name": "Apple VN",
   *   "number": "190123123123",
   *   "branch": "",
   *   "bank": "Techcombank"
   * }
   */
  const paymentRecipient = {
    name: "Demo Store",
    number: "190123123123",
    branch: "",
    bank: "Techcombank",
  }

  return {
    referenceId,
    totalAmount,
    orderLines,
    paymentRecipient,
  }
}

/**
 * This is called after order ID is created.
 * You have to record the order ID somewhere for later use.
 *
 * @param db
 * @param id {string} Order ID
 * @param payload {object} Order creation request payload + local ID
 * @return {Promise<void>}
 */
const handleOrder = async (db, id, payload) => {
  const data = {
    orderId: id,
    ...payload,
    status: BNPL_ORDER_STATUS.ORDER_STATUS_PENDING,
    commitments: {}
  }
  await db.Order.create(data)
}

/**
 * This function retrieves order commitment values from DB
 *
 * @param db
 * @param orderId
 * @returns {Promise<Object|null>}
 */
const fetchOrderCommitment = async (db, orderId) => {
  const model = await db.Order.findOne({ where: { orderId } })
  if (model) {
    return model.commitments;
  }
  return null;
}

const updateOrderCommitment = async (db, orderId, commitments) => {
  const order = await db.Order.findOne({ where: { orderId } })
  if (!order) {
    return null;
  }
  await order.update({ commitments })
}


/**
 * This function returns Credify ID associated with a provided order ID
 *
 * @param db
 * @param orderId {string}
 * @returns {Promise<string|null>}
 */
const getCredifyId = async (db, orderId) => {
  const order = await db.Order.findOne({ where: { orderId } })
  if (!order) {
    return null;
  }
  const user = await fetchUser(db, order.localId, undefined)
  if (!user) {
    return null;
  }
  return user.credifyId;
}

/**
 * This function saves disbursement docs per order ID
 * @param db
 * @param orderId {string}
 * @param disbursementDocs {
 *  {
 *    "invoice": "https://xx.com/invoce.pdf",
 *    "down_payment": "https://xx.com/down_payment.pdf",
 *    "first_payment": "https://xx.com/first_payment.pdf",
 *    "delivery": "https://xx.com/delivery.pdf"
 *  }
 * }
 * @returns {Promise<null>}
 */
const saveDisbursementDocs = async (db, orderId, disbursementDocs) => {
  const order = await db.Order.findOne({ where: { orderId } })
  if (!order) {
    return null;
  }
  await order.update({ disbursementDocs })
}

/**
 * This function returns document references by order ID
 * @param db
 * @param orderId
 * @returns {Promise<null|{invoice: "https://xx.com/invoce.pdf", down_payment: "https://xx.com/down_payment.pdf", first_payment: "https://xx.com/first_payment.pdf", delivery: "https://xx.com/delivery.pdf"}|*>}
 */
const fetchDisbursementDocs = async (db, orderId) => {
  const order = await db.Order.findOne({ where: { orderId } })
  if (!order) {
    return null;
  }
  return order.disbursementDocs
}

/////////////////////////////////////////////////////////////
// Private methods (please modify the following as you like.)
/////////////////////////////////////////////////////////////

/**
 * This retrieves user model from DB
 * The key will be either local (internal) ID or Credify ID
 *
 * @param db
 * @param localId
 * @param credifyId
 * @returns {Promise<Model|null>}
 */
const fetchUser = async (db, localId, credifyId) => {
  let u = null;

  if (credifyId) {
    const users = await db.Users.findAll({ where: { credifyId } })
    if (users.length === 1) {
      u = users[0]
    }
  }
  if (u === null && localId) {
    u = await db.Users.findByPk(localId)
  }
  return u;
}


/**
 * This retrieves commitment model from DB
 *
 * @param db
 * @param credifyId
 * @returns {Promise<Object|null>}
 */
const fetchCommitment = async (db, credifyId) => {
  const model = await db.Commitment.findOne({ where: { credifyId } })
  if (model) {
    return model.values;
  }
  return null;
}


module.exports = {
  fetchVerificationInfo,
  fetchUserClaimObject,
  updateUserId,
  upsertCommitments,
  authenticateInternalUser,
  authenticateInternalAPIClient,
  getBNPLCallback,
  handleOfferStatusUpdate,
  handleDisputeCompletion,
  handleOrderStatusUpdate,
  buildOrderCreationPayload,
  handleOrder,
  apiDomain,
  fetchOrderCommitment,
  updateOrderCommitment,
  getCredifyId,
  saveDisbursementDocs,
  fetchDisbursementDocs,
}
