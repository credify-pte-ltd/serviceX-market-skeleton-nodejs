'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commitment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Commitment.init({
    credifyId: DataTypes.STRING,
    values: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Commitment',
  });
  return Commitment;
};
