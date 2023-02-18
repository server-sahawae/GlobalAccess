"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.AccessUsers);
      Company.hasMany(models.AccessCompanies);
      // Company.belongsTo(models.Address);
      Company.belongsTo(models.User);
    }
  }
  Company.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      coordinates: DataTypes.GEOMETRY,
      country: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      postalcode: DataTypes.STRING,
      UserId: DataTypes.UUID,
      CreatorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: "Users", key: "id" },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Company",
    }
  );
  return Company;
};
