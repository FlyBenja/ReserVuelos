'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si la tabla 'Roles' existe
    const tableExists = await queryInterface.sequelize.query(
      "SELECT to_regclass('public.Roles')"
    );

    if (tableExists[0][0].to_regclass) {
      // Asegurarse de que el rol Admin existe
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
    } else {
      console.warn("La tabla 'Roles' no existe. Asegúrate de ejecutar las migraciones primero.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar el pasajero asociado al usuario
    const [userResults] = await queryInterface.sequelize.query(
      "SELECT id FROM Users WHERE username = 'admin'"
    );

    if (userResults.length > 0) {
      const userId = userResults[0].id;
      await queryInterface.bulkDelete('Pasajeros', { user_id: userId }, {});
    }

    // Eliminar el usuario
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};
