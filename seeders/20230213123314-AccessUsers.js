"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/data.json").AccessUsers.map((el) => {
      el.createdAt = new Date(Date.now() - 604800000);
      el.updatedAt = new Date(Date.now() - 604800000);
      return el;
    });
    await queryInterface.bulkInsert("AccessUsers", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AccessUsers");
  },
};
