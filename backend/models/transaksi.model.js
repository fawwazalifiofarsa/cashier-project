'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi,{
        foreignKey: "id_transaksi"
      })
      this.belongsTo(models.user,{
        foreignKey: "id_user"
      })
      this.belongsTo(models.meja,{
        foreignKey: "id_meja"
      })
    }
  }
  transaksi.init({
    id_transaksi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tgl_transaksi: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_meja:  {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama_pelanggan:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('belum_bayar', 'lunas'),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi'
  });
  return transaksi;
};