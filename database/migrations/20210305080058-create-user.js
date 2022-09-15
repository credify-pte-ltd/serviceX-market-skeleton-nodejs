"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      phoneCountryCode: {
        type: Sequelize.STRING,
      },
      hashedPhoneNumber: {
        type: Sequelize.STRING,
      },
      creditScore: {
        type: Sequelize.INTEGER,
      },
      totalPaymentAmount: {
        type: Sequelize.INTEGER,
      },
      averageSpending: {
        type: Sequelize.INTEGER,
      },
      paymentMethods: {
        type: Sequelize.STRING,
      },
      lastPurchaseProduct: {
        type: Sequelize.STRING,
      },
      transactionsCount: {
        type: Sequelize.INTEGER,
      },
      married: {
        type: Sequelize.BOOLEAN,
      },
      divorced: {
        type: Sequelize.BOOLEAN,
      },
      tier: {
        type: Sequelize.STRING,
      },
      loyaltyPoint: {
        type: Sequelize.INTEGER,
      },
      credifyId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users")
  },
}
