

const simulation = async (req, res, { db, credify }) => {
  try {

    const productType = req.body.productType
    const providerIds = req.body.providerIds
    const inputs = req.body.inputs

    const response = await credify.offer.simulate(productType, providerIds, inputs)

    res.status(200).json(response)
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}

module.exports = simulation;

