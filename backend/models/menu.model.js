'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.menu,{
        foreignKey: "id_menu"
      })
    }
  }
  menu.init({
    id_menu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nama_menu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jenis: {
      type: DataTypes.ENUM('makanan', 'minuman'),
      allowNull: false
    },
    deskripsi: DataTypes.TEXT,
    gambar: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'menu',
    tableName: 'menu'
  });
  return menu;
};