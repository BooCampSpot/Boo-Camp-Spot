'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      reviewID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hauntedID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};