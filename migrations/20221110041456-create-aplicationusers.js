"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("aplicationusers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ApplicationId: {
        type: Sequelize.UUID,
        references: { model: "applications" },
      },
      UserId: {
        type: Sequelize.UUID,
        references: { model: "users" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("aplicationusers");
  },
};
