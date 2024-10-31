'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si la tabla 'Roles' existe antes de realizar la consulta
    const tableExists = await queryInterface.sequelize.query(
      "SELECT to_regclass('public.Roles')"
    );

    if (tableExists[0][0].to_regclass) {
      // Intentar insertar el rol 'Admin'
      try {
        // Verificar si el rol 'Admin' ya existe
        const [results] = await queryInterface.sequelize.query(
          "SELECT * FROM Roles WHERE nombreRole = 'Admin'"
        );

        // Solo insertar si no existe
        if (results.length === 0) {
          await queryInterface.bulkInsert('Roles', [
            {
              nombreRole: 'Admin',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ], {});
          console.log("Rol 'Admin' creado exitosamente.");
        } else {
          console.warn("El rol 'Admin' ya existe en la tabla 'Roles'.");
        }
      } catch (error) {
        // Manejar otros posibles errores
        console.error("Error al intentar insertar el rol 'Admin':", error.message);
        throw error; // Re-lanza el error si es otro tipo
      }
    } else {
      console.warn("La tabla 'Roles' no existe. Asegúrate de ejecutar las migraciones primero.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', { nombreRole: 'Admin' }, {});
  }
};
