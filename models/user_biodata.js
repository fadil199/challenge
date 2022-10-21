'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Biodata.init({
    id_user: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    umur: DataTypes.INTEGER,
    kota: DataTypes.STRING,
    nomor_telepon: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Biodata',
  });
  return User_Biodata;
};