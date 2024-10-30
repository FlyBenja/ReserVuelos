// seeds/20241030021803-create-admin-role.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [results, metadata] = await queryInterface.sequelize.query(
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
