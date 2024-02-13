'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_transaksi', {
      id_detail_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        primaryKey: true,
        references: {
          model: 'transaksi',
          key: 'id_transaksi'
        }
      },
      id_menu: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        primaryKey: true,
        references: {
          model: 'menu',
          key: 'id_menu'
        }
      },
      harga: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('detail_transaksi');
  }
};