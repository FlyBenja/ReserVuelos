'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Borra todos los registros en la tabla Users
    await queryInterface.bulkDelete('Users', null, {});

    // Inserta el usuario admin
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
    // Borra el usuario admin si es necesario
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};
