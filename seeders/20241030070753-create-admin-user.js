'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Asegurarse de que la tabla Roles existe
    await queryInterface.sequelize.query("CREATE TABLE IF NOT EXISTS Roles (id SERIAL PRIMARY KEY, nombreRole VARCHAR(255), createdAt TIMESTAMP, updatedAt TIMESTAMP)");

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
    } else {
      console.error("El rol 'Admin' no existe. Asegúrate de que la migración de roles se haya ejecutado correctamente.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};
