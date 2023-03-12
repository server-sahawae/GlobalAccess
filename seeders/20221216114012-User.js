"use strict";

const { hash } = require("../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/data.json").Users.map((el) => {
      el.password = hash(el.password);
      el.createdAt = new Date(Date.now() - 604800000);
      el.updatedAt = new Date(Date.now() - 604800000);
      return el;
    });
    await queryInterface.bulkInsert("Users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users");
  },
};
