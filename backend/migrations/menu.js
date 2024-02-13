'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu', {
      id_menu: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      nama_menu: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jenis: {
        allowNull: false,
        type: Sequelize.ENUM('makanan', 'minuman')
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      gambar: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('menu');
  }
};