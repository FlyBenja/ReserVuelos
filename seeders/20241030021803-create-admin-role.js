'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Borra todos los registros en la tabla Roles
    await queryInterface.bulkDelete('Roles', null, {});

    // Inserta el rol de Admin
    await queryInterface.bulkInsert('Roles', [{
      nombreRole: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Borra el rol de Admin si es necesario
    await queryInterface.bulkDelete('Roles', { nombreRole: 'Admin' }, {});
  }
};
