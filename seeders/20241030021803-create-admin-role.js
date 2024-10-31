'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si la tabla 'Roles' existe antes de realizar la consulta
    const tableExists = await queryInterface.sequelize.query(
      "SELECT to_regclass('public.Roles')"
    );

    if (tableExists[0][0].to_regclass) {
      const [results] = await queryInterface.sequelize.query(
        "SELECT * FROM Roles WHERE nombreRole = 'Admin'"
      );

      if (results.length === 0) {
        await queryInterface.bulkInsert('Roles', [
          {
            nombreRole: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ], {});
      }
    } else {
      console.warn("La tabla 'Roles' no existe. Asegúrate de ejecutar las migraciones primero.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', { nombreRole: 'Admin' }, {});
  }
};