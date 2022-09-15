'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Orders", "disbursementDocs", {
      type: Sequelize.JSONB,
      defaultValue: {},
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "disbursementDocs");
  },
};
