'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_History.init({
    id_user: DataTypes.INTEGER,
    username: DataTypes.STRING,
    nama_game: DataTypes.STRING,
    nilai: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_History',
  });
  return User_History;
};