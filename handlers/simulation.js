const {authenticateInternalAPIClient } = require("../dataInteraction");

const simulation = async (req, res, { db, credify }) => {
  const validRequest = await authenticateInternalAPIClient(db, req);
  if (!validRequest) {
    return res.status(401).send({ message: "Unauthorized" })
  }

  try {

    const productType = req.body.productType
    const request= req.body.request

    const response = await credify.offer.simulate(productType, request)

    res.status(200).json(response)
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}

module.exports = simulation;

