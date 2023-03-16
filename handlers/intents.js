const {authenticateInternalAPIClient } = require("../dataInteraction");

const intents = async(req, res, { db, credify }) => {
  const validRequest = await authenticateInternalAPIClient(db, req);
  if (!validRequest) {
    return res.status(401).send({ message: "Unauthorized" })
  }

  try {

    const request = req.body.request
    const response = await credify.intent.lodgeNewIntent(request)
    
    res.status(200).json(response)
  } catch(e) {
    res.status(500).send({ message: e.message })
  }
}

module.exports = intents