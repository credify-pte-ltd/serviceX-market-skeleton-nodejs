const extractToken = require("../utils/extractToken");
const composeDisbursementClaims = require("../utils/composeDisbursementClaims");
const {getCredifyId, fetchDisbursementDocs} = require("../dataInteraction");
const loadDocuments = require("../utils/base64StringFromRemoteFile")

const getBNPLDisbursementDocs = async (
  req,
  res,
  { db, credify }
) => {
  const orderId = req.params.orderId;
  const accessToken = extractToken(req);
  const organizationId = process.env.APP_ID
  if (process.env.CONTEXT_ENV !== "Jest") {
    if (!accessToken || !orderId) {
      console.log(`get disbursement requirement - request body was invalid`);
      return res.status(400).send({ message: "Invalid body" });
    }
  }

  // try {
  //   const validToken = await credify.auth.introspectToken(
  //     accessToken,
  //     `bnpl_order:${orderId}`
  //   );
  //   if (!validToken) {
  //     console.log(`bnpl order - token was invalid`);
  //     return res.status(401).send({ message: "Unauthorized" });
  //   }
  // } catch (e) {
  //   console.log(
  //     `check existence - internal error (node.js SDK may have an issue)`
  //   );
  //   return res.status(500).send({ message: e.message });
  // }

  //TODO: will update logic to get public key later
  const publicKey = "";

  try {
    // Handle format claim

    const documentRefs = await fetchDisbursementDocs(db, orderId);
    const docs = await loadDocuments(documentRefs)

    const claims = await composeDisbursementClaims(db, docs, orderId, true);
    const credifyId = await getCredifyId(db, orderId);
    const disbursementData =
      await credify.claims.generateDisbursementDocumentsData(
        claims,
        publicKey,
        organizationId,
        credifyId
      );

    res.status(200).send(disbursementData);
  } catch (e) {
    console.log(`Get disbursement requirement - error:`, e);
    res.status(500).send(e.message);
  }
};

module.exports = getBNPLDisbursementDocs
