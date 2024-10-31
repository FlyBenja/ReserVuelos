'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash('admin', 10); // Hashea la contraseña 'admin'

    // Verificar si el usuario 'admin' ya existe
    const [results] = await queryInterface.sequelize.query(
      "SELECT * FROM Users WHERE username = 'admin'"
    );

    // Solo insertar si no existe
    if (results.length === 0) {
      // Insertar el usuario admin con roleId = 1
      await queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: hashedPassword,
        roleId: 1, // Asignar roleId = 1 fijo
        createdAt: new Date(),
        updatedAt: new Date()
      }]);

      console.log("Usuario 'admin' creado exitosamente.");
    } else {
      console.log("El usuario 'admin' ya existe en la tabla 'Users'. No se necesita crear uno nuevo.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { username: 'admin' });
  }
};
