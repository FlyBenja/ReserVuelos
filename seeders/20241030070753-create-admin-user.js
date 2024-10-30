'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si el rol Admin existe
    const [results] = await queryInterface.sequelize.query(
      "SELECT * FROM Roles WHERE nombreRole = 'Admin'"
    );

    // Solo insertar el usuario si el rol Admin existe
    if (results.length > 0) {
      const hashedPassword = await bcrypt.hash('admin', 10); // Hashea la contraseña

      await queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: hashedPassword,
        roleId: results[0].id, // Usar el ID del rol encontrado
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};
