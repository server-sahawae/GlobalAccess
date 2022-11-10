'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aplicationusers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  aplicationusers.init({
    ApplicationId: DataTypes.UUID,
    UserId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'aplicationusers',
  });
  return aplicationusers;
};