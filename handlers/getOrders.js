const {authenticateInternalAPIClient } = require("../dataInteraction");

/**
 *
 * @param req
 * @param res
 * @param db
 * @param credify
 * @return {Promise<{
 *     id: string;
 *     referenceId: string;
 *     totalAmount: FiatCurrency | any;
 *     orderLines: OrderLine[];
 *     paymentRecipient: PaymentRecipient;
 *     orderStatus: string;
 *     bnplAccountNumber: string;
 * }>}
 */
const getOrders = async (req, res, { db, credify }) => {
  const validRequest = await authenticateInternalAPIClient(db, req);
  if (!validRequest) {
    return res.status(401).send({ message: "Unauthorized" })
  }

  const credifyId = req.params.id

  try {
    const orders = await credify.bnpl.getOrders(credifyId)
    res.send(orders)
  } catch (e) {
    res.status(400).send({ message: e.message })
  }
}

module.exports = getOrders
