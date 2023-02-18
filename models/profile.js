"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Profile.belongsTo(models.Address);
      Profile.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      idNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      image: DataTypes.STRING,
      UserId: DataTypes.UUID,
      address: DataTypes.STRING,
      coordinates: DataTypes.GEOMETRY,
      country: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      postalcode: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Profile",
    }
  );
  return Profile;
};
