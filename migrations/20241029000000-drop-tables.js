'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Esto puede quedar vacío o contener operaciones adicionales
  },

  async down(queryInterface, Sequelize) {
    // Elimina primero las tablas que tienen claves foráneas
    await queryInterface.dropTable('DatosVuelos');
    await queryInterface.dropTable('Reservas');
    await queryInterface.dropTable('ClaseVuelos');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Roles');
  },
};
