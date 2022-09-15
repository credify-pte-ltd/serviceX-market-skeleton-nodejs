const { Op } = require("sequelize")
const extractToken = require("../utils/extractToken")
const { PERMISSION_SCOPE } = require("../utils/constants")

const countUsers = async (req, res, { db, credify }) => {
  if (process.env.CONTEXT_ENV !== "Jest") {
    const token = extractToken(req)
    try {
      const validToken = await credify.auth.introspectToken(
        token,
        PERMISSION_SCOPE.COUNT_USER
      )
      if (!validToken) {
        return res.status(401).send({ message: "Unauthorized" })
      }
    } catch (e) {
      return res.status(500).send({ message: e.message })
    }
  }

  const ids = req.body.ids || []
  let conditions = req.body.conditions || [{}]
  conditions = conditions.map((c) => {
    if (c === null) return {}
    else return c
  })
  const requiredCustomScopes = req.body.required_custom_scopes || []

  // This is a future usage. Not necessary at the moment

  try {
    const response = {
      data: {
        counts: [0],
      },
    }
    res.json(response)
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}

module.exports = countUsers
