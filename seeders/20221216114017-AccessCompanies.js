"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/data.json").AccessCompanies.map((el) => {
      el.createdAt = new Date(Date.now() - 604800000);
      el.updatedAt = new Date(Date.now() - 604800000);
      return el;
    });
    await queryInterface.bulkInsert("AccessCompanies", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AccessCompanies");
  },
};
