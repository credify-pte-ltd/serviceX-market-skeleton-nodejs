const {
  authenticateInternalUser,
  saveDisbursementDocs,
  getCredifyId,
  updateOrderCommitment
} = require("../dataInteraction");
const composeDisbursementClaims = require("../utils/composeDisbursementClaims")
const loadDocuments = require("../utils/base64StringFromRemoteFile");

const pushDisbursementClaims = async (req, res, { db, credify }) => {

  const validRequest = await authenticateInternalUser(db, req);
  if (!validRequest) {
    return res.status(401).send({ message: "Unauthorized" })
  }

  const organizationId = process.env.APP_ID
  if (!organizationId) {
    return res.status(400).send({ message: "Please recheck config - organization ID" })
  }

  if (!req.body.order_id || !req.body.documents) {
    return res.status(400).send({ message: "Invalid body" })
  }

  try {
    const orderId = req.body.order_id
    const documentRefs = req.body.documents

    const credifyId = await getCredifyId(db, orderId)
    if (!credifyId) {
      return res.status(500).send({ message: "No Credify ID associated with this Order ID" })
    }
    const docs = await loadDocuments(documentRefs)
    const claims = await composeDisbursementClaims(db, docs, orderId, false)

    const commitments = await credify.claims.push(
      organizationId,
      credifyId,
      claims
    )

    await updateOrderCommitment(db, orderId, commitments);
    await saveDisbursementDocs(db, orderId, documentRefs)

    res.json({ credifyId })
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}

module.exports = pushDisbursementClaims
