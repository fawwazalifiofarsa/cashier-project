'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      id_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      tgl_transaksi: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id_user'
        }
      },
      id_meja: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        primaryKey: true,
        references: {
          model: 'meja',
          key: 'id_meja'
        }
      },
      nama_pelanggan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('belum_bayar', 'lunas')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaksi');
  }
};