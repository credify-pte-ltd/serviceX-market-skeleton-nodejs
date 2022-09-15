'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Orders", "status", {
      type: Sequelize.STRING,
      defaultValue: "PENDING",
    });

    await queryInterface.addColumn("Orders", "commitments", {
      type: Sequelize.JSONB,
      defaultValue: {},
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "status");
    await queryInterface.removeColumn("Orders", "commitments");
  },
};
