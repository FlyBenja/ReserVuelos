'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash('admin', 10); // Hashea la contraseña 'admin'

    // Insertar el usuario admin con roleId = 1
    await queryInterface.bulkInsert('Users', [{
      username: 'admin',
      password: hashedPassword,
      roleId: 1
    }]);

    console.log("Usuario 'admin' creado exitosamente.");
  }
};
