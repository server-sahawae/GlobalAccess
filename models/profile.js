"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      image: DataTypes.STRING,
      AddressId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "profile",
    }
  );
  return profile;
};
