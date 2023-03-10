"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.AccessUsers);
      User.hasMany(models.Company);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      CreatorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: "Users", key: "id" },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "User",
    }
  );
  return User;
};
