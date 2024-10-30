'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Primero, elimina todos los usuarios
    await queryInterface.bulkDelete('Users', {}, {});

    // Luego, elimina todos los roles
    await queryInterface.bulkDelete('Roles', {}, {});

    // Insertar nuevo rol
    await queryInterface.bulkInsert('Roles', [{
      nombreRole: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', { nombreRole: 'Admin' }, {});
  }
};
