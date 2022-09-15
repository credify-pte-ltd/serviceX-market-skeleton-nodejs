const axios = require("axios")

const base64StringFromRemoteFile = async (url) => {
  let image = await axios.get(url, {responseType: 'arraybuffer'});
  return Buffer.from(image.data).toString('base64');
}

/**
 *
 * @param documentRefs {
 *  {
 *    "invoice": "https://xx.com/invoce.pdf",
 *    "down_payment": "https://xx.com/down_payment.pdf",
 *    "first_payment": "https://xx.com/first_payment.pdf",
 *    "delivery": "https://xx.com/delivery.pdf"
 *  }
 * }
 * @returns {Promise<{object}>}
 */
const loadDocuments = async (documentRefs) => {
  const files = await Promise.all(Object.keys(documentRefs).map(async (key) => {
    const url = documentRefs[key]
    return await base64StringFromRemoteFile(url)
  }))

  let docs = {}
  Object.keys(documentRefs).forEach((key, index) => {
    docs[key] = files[index]
  })
  return docs
}

module.exports = loadDocuments
