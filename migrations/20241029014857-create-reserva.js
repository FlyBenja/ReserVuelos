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
      estado: { // Campo para estado de la reserva (Confirmado o Cancelado)
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Confirmado por defecto
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservas');
  },
};
