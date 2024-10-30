'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Elimina todos los usuarios
    await queryInterface.bulkDelete('Users', {}, {});

    // Insertar nuevo usuario
    const hashedPassword = await bcrypt.hash('admin', 10); // Hashea la contraseña

    await queryInterface.bulkInsert('Users', [{
      username: 'admin',
      password: hashedPassword,
      roleId: 1, // Asegúrate de que el rol con ID 1 existe
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};
