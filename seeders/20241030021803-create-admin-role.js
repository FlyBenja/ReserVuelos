'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [results] = await queryInterface.sequelize.query(
      "SELECT * FROM Roles WHERE nombreRole = 'Admin'"
    );
    if (results.length === 0) {
      await queryInterface.bulkInsert('Roles', [{
        nombreRole: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', {
      nombreRole: 'Admin',
    });
  }
};
