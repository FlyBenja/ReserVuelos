'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      codigoReserva: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      fechaInicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fechaFinal: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      // Se han eliminado los campos createdAt y updatedAt
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservas');
  },
};
