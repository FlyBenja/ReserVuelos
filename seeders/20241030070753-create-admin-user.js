'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si la tabla 'Roles' existe
    const tableExists = await queryInterface.sequelize.query(
      "SELECT to_regclass('public.Roles')"
    );

    if (tableExists[0][0].to_regclass) {
      // Asegurarse de que el rol con role_id = 1 existe
      const [results] = await queryInterface.sequelize.query(
        "SELECT * FROM Roles WHERE id = 1"
      );

      // Solo insertar el usuario si el rol con role_id = 1 existe
      if (results.length > 0) {
        const hashedPassword = await bcrypt.hash('admin', 10); // Hashea la contraseña

        await queryInterface.bulkInsert('Users', [{
          username: 'admin',
          password: hashedPassword,
          roleId: 1, // Asignar role_id = 1 fijo
          createdAt: new Date(),
          updatedAt: new Date()
        }]);
      } else {
        console.warn("El rol con role_id = 1 no existe. No se creará el usuario.");
      }
    } else {
      console.warn("La tabla 'Roles' no existe. Asegúrate de ejecutar las migraciones primero.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar el usuario
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};
