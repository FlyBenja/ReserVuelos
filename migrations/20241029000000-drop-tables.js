'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Este archivo no crea ninguna tabla, solo se usa para eliminar en orden
  },

  async down(queryInterface, Sequelize) {
    // Eliminar tablas en orden inverso para evitar errores de dependencias
    await queryInterface.dropTable('DatosVuelos'); // Primero se elimina 'DatosVuelos'
    await queryInterface.dropTable('ClaseVuelos'); // Luego se elimina 'ClaseVuelos'
    await queryInterface.dropTable('Reservas'); // Luego se elimina 'Reservas'
    await queryInterface.dropTable('Users'); // Finalmente se elimina 'Users' si es necesario
  },
};
