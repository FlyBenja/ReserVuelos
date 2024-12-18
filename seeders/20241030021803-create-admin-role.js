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
          ]);
          console.log("Rol 'Admin' creado exitosamente.");
        } else {
          console.log("El rol 'Admin' ya existe en la tabla 'Roles'. No se necesita crear uno nuevo.");
        }
      } catch (error) {
        console.error("Error al intentar insertar el rol 'Admin':", error.message);
      }
    } else {
      console.warn("La tabla 'Roles' no existe. Asegúrate de ejecutar las migraciones primero.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', { nombreRole: 'Admin' });
  }
};
