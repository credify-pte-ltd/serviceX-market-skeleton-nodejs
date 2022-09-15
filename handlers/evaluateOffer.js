const extractToken = require("../utils/extractToken")
const { PERMISSION_SCOPE } = require("../utils/constants")
const {fetchUserClaimObject} = require("../dataInteraction");

const evaluate = async (req, res, { db, credify }) => {
  if (process.env.CONTEXT_ENV !== "Jest") {
    const token = extractToken(req)
    try {
      const validToken = await credify.auth.introspectToken(
        token,
        PERMISSION_SCOPE.READ_EVALUATED_OFFER
      )
      if (!validToken) {
        return res.status(401).send({ message: "Unauthorized" })
      }
    } catch (e) {
      return res.status(500).send({ message: e.message })
    }
  }

  if (!req.body.credify_id || !req.body.scopes) {
    return res.status(400).send({ message: "Invalid body" })
  }
  let conditions = req.body.conditions || [{}]
  conditions = conditions.map((c) => {
    return c === null ? {} : c
  })
  const requiredCustomScopes = req.body.required_custom_scopes || []

  try {
    const credifyId = req.body.credify_id;
    const sharedScopes = req.body.scopes
    const userSharedClaims = await fetchUserClaimObject(db, undefined, credifyId, sharedScopes, false);

    const result = await credify.offer.evaluateOffer(
      conditions,
      requiredCustomScopes,
      userSharedClaims
    )
    const response = {
      data: {
        rank: result.rank,
        used_scopes: result.usedScopes,
        requested_scopes: result.requestedScopes,
      },
    }
    res.json(response)
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}

module.exports = evaluate
