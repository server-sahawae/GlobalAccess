"use strict";
const fs = require("fs");
module.exports = {
  async up(queryInterface, Sequelize) {
    const data =
      // const data = require("../data/data.json").ApplicationVersions
      JSON.parse(
        fs.readFileSync("./data/data.json", "utf-8")
      ).ApplicationVersions.map((el, index) => {
        if (index < 2) {
          el.createdAt = new Date();
          el.updatedAt = new Date();
          return el;
        } else {
          el.createdAt = new Date(Date.now() + 604800000);
          el.updatedAt = new Date(Date.now() + 604800000);
          return el;
        }
      });
    console.log(data);
    await queryInterface.bulkInsert("ApplicationVersions", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ApplicationVersions");
  },
};
