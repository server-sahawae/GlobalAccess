"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.hasMany(models.AccessUsers);
      Application.hasMany(models.AccessCompanies);
      Application.hasMany(models.ApplicationVersions);
    }
  }
  Application.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      RoleLevel: DataTypes.STRING,
      CreatorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: "Users", key: "id" },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Application",
    }
  );
  return Application;
};
