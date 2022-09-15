"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.TEXT,
      phoneNumber: DataTypes.STRING,
      phoneCountryCode: DataTypes.STRING,
      hashedPhoneNumber: DataTypes.STRING,
      creditScore: DataTypes.INTEGER,
      totalPaymentAmount: DataTypes.INTEGER,
      averageSpending: DataTypes.INTEGER,
      paymentMethods: DataTypes.STRING,
      lastPurchaseProduct: DataTypes.STRING,
      transactionsCount: DataTypes.INTEGER,
      married: DataTypes.BOOLEAN,
      divorced: DataTypes.BOOLEAN,
      tier: DataTypes.STRING,
      loyaltyPoint: DataTypes.INTEGER,
      credifyId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  )
  return Users
}
