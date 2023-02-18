"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccessUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccessUsers.belongsTo(models.Application);
      AccessUsers.belongsTo(models.Role);
      AccessUsers.belongsTo(models.Company);
      AccessUsers.belongsTo(models.User);
    }
  }
  AccessUsers.init(
    {
      ApplicationId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: "Applications", key: "id" },
      },
      CompanyId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: "Companies", key: "id" },
      },
      UserId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: "Users", key: "id" },
      },
      RoleId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: "Roles", key: "id" },
      },
      CreatorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: "Users", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "AccessUsers",
    }
  );
  return AccessUsers;
};
