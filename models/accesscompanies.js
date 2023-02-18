"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccessCompanies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccessCompanies.belongsTo(models.Application);
      AccessCompanies.belongsTo(models.Company);
      AccessCompanies.hasMany(models.Role, { foreignKey: "AccessCompaniesId" });
    }
  }
  AccessCompanies.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ApplicationId: DataTypes.UUID,
      CompanyId: DataTypes.UUID,

      CreatorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: "Users", key: "id" },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "AccessCompanies",
    }
  );
  return AccessCompanies;
};
