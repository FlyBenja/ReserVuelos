'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Asegurarse de que la tabla Roles existe
    const [results] = await queryInterface.sequelize.query(
      "SELECT * FROM Roles WHERE nombreRole = 'Admin'"
    );

    // Solo insertar el usuario si el rol Admin existe
    if (results.length > 0) {
      const hashedPassword = await bcrypt.hash('admin', 10); // Hashea la contraseña

      const newUser = await queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: hashedPassword,
        roleId: results[0].id, // Usar el ID del rol encontrado
        createdAt: new Date(),
        updatedAt: new Date()
      }], { returning: true });

      // Crear un pasajero relacionado al nuevo usuario
      if (newUser.length > 0) {
        const userId = newUser[0].id; // Obtener el ID del usuario recién creado
        await queryInterface.bulkInsert('Pasajeros', [{
          user_id: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        }]);
      }
    } else {
      console.error("El rol 'Admin' no existe. Asegúrate de que la migración de roles se haya ejecutado correctamente.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
    await queryInterface.bulkDelete('Pasajeros', { user_id: userId }, {}); // Asegúrate de que esta línea funcione correctamente.
  }
};
