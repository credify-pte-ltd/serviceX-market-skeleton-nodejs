const PERMISSION_SCOPE = {
  COUNT_USER: "oidc_client:read_user_counts",
  READ_EVALUATED_OFFER: "individual:read_evaluated_offer",
  READ_FILTER_OFFER: "claim_provider:read_filtered_offers",
}

const DEFAULT_PATH_PREFIX = "/v1"

const DEFAULT_PATH = {
  // Credify specs
  PUSH_CLAIMS: "/api/claims/push",
  OFFERS_FILTERING: "/api/offers/filter",
  USER_COUNTS: "/api/offers/segment",
  OFFER_EVALUATION: "/api/offers/evaluate",
  ENCRYPTED_CLAIMS: "/api/claims/request",
  BNPL_COMPLETION_CALLBACK: "/api/bnpl/orders/:orderId/redirect",
  OLD_BNPL_COMPLETION_CALLBACK: "/api/bnpl/order/:orderId/redirect",
  GET_BNPL_DISBURSEMENT_DOCS: "/api/bnpl/orders/:orderId/disbursement-requirements",

  // Customizable
  WEBHOOK: "/webhook",
  PUSH_BNPL_DISBURSEMENT_CLAIMS: "/push-disbursement-claims",
};

const WEBHOOK_EVENTS = {
  OFFER_TX_STATUS_UPDATED: "OFFER_TRANSACTION_STATUS_UPDATED",
  DISPUTE_COMPLETED: "OFFER_TRANSACTION_DISPUTE_STATUS_UPDATED",
  ORDER_STATUS_UPDATED: "BNPL_ORDER_STATUS_UPDATED",
  DISBURSEMENT_STATUS_UPDATED: "BNPL_DISBURSEMENT_REQUIREMENT_STATUS_UPDATED"
}

const DISBURSEMENT_DOCS = {
  INVOICE: "INVOICE",
  DOWN_PAYMENT: "DOWN_PAYMENT",
  FIRST_PAYMENT: "FIRST_PAYMENT",
  DELIVERY: "DELIVERY",
}

const BNPL_ORDER_STATUS = {
  ORDER_STATUS_PENDING: "PENDING",
  ORDER_STATUS_APPROVED: "APPROVED",
  ORDER_STATUS_CANCELED: "CANCELED",
  ORDER_STATUS_CANCELING: "CANCELING",
  ORDER_STATUS_DISBURSING: "DISBURSING",
  ORDER_STATUS_PAID: "PAID",
};

const STANDARD_SCOPES = ["phone", "email", "address", "profile"];

const CONDITION_KINDS = {
  containCondition: "CONTAIN_CONDITION",
  inRangeCondition: "IN_RANGE_CONDITION",
  largerThanCondition: "LARGER_THAN_CONDITION",
  largerThanOrEqualCondition: "LARGER_THAN_OR_EQUAL_CONDITION",
  lessThanCondition: "LESS_THAN_CONDITION",
  lessThanOrEqualCondition: "LESS_THAN_OR_EQUAL_CONDITION",
  equalityCondition: "EQUALITY_CONDITION",
  andCondition: "AND_CONDITION",
}

module.exports = {
  PERMISSION_SCOPE,
  DEFAULT_PATH_PREFIX,
  DEFAULT_PATH,
  WEBHOOK_EVENTS,
  DISBURSEMENT_DOCS,
  BNPL_ORDER_STATUS,
  STANDARD_SCOPES,
  CONDITION_KINDS,
}
