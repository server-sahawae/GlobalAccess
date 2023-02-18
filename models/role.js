"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.AccessUsers);
      Role.belongsTo(models.AccessCompanies, {
        foreignKey: "AccessCompaniesId",
      });
    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      level: DataTypes.INTEGER,
      AccessCompaniesId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: "AccessCompanies" },
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
