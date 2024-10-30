'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      {
        nombreRole: 'Admin',  // Nombre del rol
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', { nombreRole: 'Admin' }, {});  // Eliminar solo el rol "Admin"
  }
};
