'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    orderId: DataTypes.STRING,
    localId: DataTypes.STRING,
    referenceId: DataTypes.STRING,
    totalAmount: DataTypes.JSONB,
    orderLines: DataTypes.JSONB,
    paymentRecipient: DataTypes.JSONB,
    status: DataTypes.STRING,
    commitments: DataTypes.JSONB,
    disbursementDocs: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
