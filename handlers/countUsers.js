const { Op } = require("sequelize")
const extractToken = require("../utils/extractToken")
const { PERMISSION_SCOPE, CONDITION_KINDS } = require("../utils/constants")
const {fetchVerificationInfo, fetchUserClaimObject} = require("../dataInteraction");

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

  let conditions = req.body.conditions || [{}]
  conditions = conditions.map((c) => {
    if (c === null) return {}
    else return c
  })
  const requiredCustomScopes = req.body.required_custom_scope || []
  if (conditions.length !== requiredCustomScopes.length) {
    return res.status(400).send({ message: "Conditions length and scopes length must be the same" })
  }

  const claims = fetchUserClaimObject

  // This is a future usage. Not necessary at the moment
  const counts = await queryUsers(db, conditions, requiredCustomScopes)
  try {
    const response = {
      data: {
        counts: counts,
      },
    }
    res.json(response)
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}

async function queryUsers(db, conditions, requiredCustomScopes) {
  const counts = []
  for (let i = 0; i < conditions.length; i++) {
    const whereClauses = {}
    const condition = conditions[i]
    // TODO: need data mapping
    const fieldToQuery = "loyaltyPoint"
    switch (condition.kind) {
      case CONDITION_KINDS.inRangeCondition:
        whereClauses[fieldToQuery] = {
          [Op.between]: [condition.value, condition.upper],
        }
        break
      case CONDITION_KINDS.containCondition:
        whereClauses[fieldToQuery] = {
          [Op.like]: `%${condition.value}%`,
        }
        break
      case CONDITION_KINDS.largerThanCondition:
        whereClauses[fieldToQuery] = {
          [Op.gt]: condition.value,
        }
        break
      case CONDITION_KINDS.largerThanOrEqualCondition:
        whereClauses[fieldToQuery] = {
          [Op.gte]: condition.value,
        }
        break
      case CONDITION_KINDS.lessThanCondition:
        whereClauses[fieldToQuery] = {
          [Op.lt]: condition.value,
        }
        break
      case CONDITION_KINDS.lessThanOrEqualCondition:
        whereClauses[fieldToQuery] = {
          [Op.lte]: condition.value,
        }
        break
      case CONDITION_KINDS.equalityCondition:
        whereClauses[fieldToQuery] = {
          [Op.eq]: condition.value,
        }
        break
      case CONDITION_KINDS.andCondition:
        whereClauses[fieldToQuery] = {
          [Op.and]: condition.conditions.map((c) => {
            return queryUsers([c], [fieldToQuery])
          }
        )}
        break
    }
    try {
      const result = await db.Users.findAll({
        where: whereClauses,
      })
      counts[i] = result.length
    } catch (e) {
      counts[i] = 0
    }
  }
  return counts
}

module.exports = countUsers
