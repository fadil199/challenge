'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      nama_game: {
        type: Sequelize.STRING
      },
      nilai: {
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
    await queryInterface.dropTable('User_Histories');
  }
};