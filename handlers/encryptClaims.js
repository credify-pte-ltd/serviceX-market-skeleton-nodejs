const extractToken = require("../utils/extractToken")
const {fetchVerificationInfo, fetchUserClaimObject} = require("../dataInteraction");

const encryptClaims = async (req, res, { db, credify }) => {
  let publicKey = "";
  let scopes = [];

  if (process.env.CONTEXT_ENV !== "Jest") {
    const accessToken = extractToken(req)

    if (accessToken === "") {
      return res.status(401).send({ message: "Unauthorized" })
    }

    if (
      !req.body.user_id ||
      !req.body.request_token ||
      !req.body.approval_token
    ) {
      return res.status(400).send({ message: "Invalid body" })
    }

    const requestToken = req.body.request_token
    const approvalToken = req.body.approval_token

    try {
      const result = await credify.claims.validateRequest(
        accessToken,
        requestToken,
        approvalToken
      )
      publicKey = result.publicKey;
      scopes = result.scopes;
    } catch (e) {
      return res.status(500).send({ message: e.message })
    }

  } else {
    publicKey = req.headers["public-key"];
    scopes = req.headers["scopes"].split(",");
  }

  try {
    const credifyId = req.body.user_id

    const claims = await fetchUserClaimObject(db, undefined, credifyId, scopes, true);
    const encrypted = await credify.claims.encrypt(claims, publicKey)
    const verificationInfo = await fetchVerificationInfo(db, credifyId);
    const data = {
      data: {
        verification_info: verificationInfo,
        claims: encrypted,
      },
    }
    res.send(data)
  } catch (e) {
    res.send(e)
  }
}

module.exports = encryptClaims
