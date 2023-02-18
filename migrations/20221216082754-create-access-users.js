"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AccessUsers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ApplicationId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Applications" },
      },
      CompanyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Companies" },
        onDelete: "cascade",
      },
      UserId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users" },
        onDelete: "cascade",
      },
      RoleId: {
        type: Sequelize.UUID,
        references: { model: "Roles" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      CreatorId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: "Users", key: "id" },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AccessUsers");
  },
};
