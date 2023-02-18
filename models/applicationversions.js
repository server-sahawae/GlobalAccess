"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ApplicationVersions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ApplicationVersions.belongsTo(models.Application);
    }
  }
  ApplicationVersions.init(
    {
      version: DataTypes.STRING,
      ApplicationId: DataTypes.UUID,
      CreatorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: "Users", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "ApplicationVersions",
    }
  );
  return ApplicationVersions;
};
