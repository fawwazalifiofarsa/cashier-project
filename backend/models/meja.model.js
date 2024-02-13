'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.meja,{
        foreignKey: "id_meja"
      })
    }
  }
  meja.init({
    id_meja: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nomor_meja: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'meja',
    tableName: 'meja'
  });
  return meja;
};