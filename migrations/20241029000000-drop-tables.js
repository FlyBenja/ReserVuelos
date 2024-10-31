'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DatosVuelo');
    await queryInterface.dropTable('Reservas');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Roles');
  },

  down: async (queryInterface, Sequelize) => {
    // No implementamos el código para volver a crear las tablas.
    // Sin embargo, podrías hacerlo si lo necesitas.
  },
};
