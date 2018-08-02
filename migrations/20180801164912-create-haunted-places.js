'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HauntedPlaces', {
      hauntedID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location:{
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('HauntedPlaces');
  }
};