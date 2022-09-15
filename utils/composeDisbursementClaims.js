const {DISBURSEMENT_DOCS} = require("./constants");
const {fetchOrderCommitment} = require("../dataInteraction");

/**
 * This function creates disbursement claims
 * @param db
 * @param documents {
 *    {
 *      "invoice": "PDF base64 (optional)",
 *      "down_payment": "PDF base64 (optional)",
 *      "first_payment": "PDF base64 (optional)",
 *      "delivery": "PDF base64 (optional)"
 *    }
 *  }
 * @param orderId { string }
 * @param withCommitments { boolean }
 * @returns {Promise<{object}>}
 */
const composeDisbursementClaims = async (db, documents, orderId, withCommitments) => {
  const BNPL_ORDER = "bnpl_order";
  const COMMITMENT = "commitment";
  const claims = {};
  if (!documents || !Object.keys(documents).length) return claims;

  let commitments = undefined;
  if (withCommitments) {
    commitments = await fetchOrderCommitment(db, orderId);
  }

  Object.keys(documents).forEach((key) => {
    let claimKey, documentContent, commitmentKey;
    if (
      key === DISBURSEMENT_DOCS.INVOICE.toLowerCase() ||
      key === DISBURSEMENT_DOCS.DOWN_PAYMENT.toLowerCase() ||
      key === DISBURSEMENT_DOCS.FIRST_PAYMENT.toLowerCase() ||
      key === DISBURSEMENT_DOCS.DELIVERY.toLowerCase()
    ) {
      claimKey = `${BNPL_ORDER}:${orderId}:${key}`;
      documentContent = documents[key];
      commitmentKey = `${BNPL_ORDER}:${orderId}:${key}:${COMMITMENT}`;
    }

    claims[`${BNPL_ORDER}:${orderId}:${key}`] = {
      [`${BNPL_ORDER}:${orderId}:${key}`]: {
        content_type: "pdf",
        content: documentContent,
      },
      [commitmentKey]: commitments ? commitments[claimKey] : undefined,
    };
  });
  return claims;
}

module.exports = composeDisbursementClaims
