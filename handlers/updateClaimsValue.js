const {authenticateInternalAPIClient } = require("../dataInteraction");

const updateClaimsValue = async(req, res, { db, credify }) => {
  const validRequest = await authenticateInternalAPIClient(db, req);
  if (!validRequest) {
    return res.status(401).send({ message: "Unauthorized" })
  }
  
  try {
    const id = req.body.id
    const claimTokens = req.body.claimTokens
    const response = await credify.offer.updateClaimsValue(id, claimTokens)

    res.status(200).json(response)
  } catch(e) {
    res.status(500).send({ message: e.message })
  }
}

module.exports = updateClaimsValue