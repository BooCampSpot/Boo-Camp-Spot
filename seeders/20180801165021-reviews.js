'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('reviews', [{
        Title: '',
        Body: '',
        rating: [1,2,3,4,5],

      }], {});
  },

  down: (queryInterface, Sequelize) => {
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkDelete('reviews', null, {});

  }
};
