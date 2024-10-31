// Migración para DatosVuelo
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DatosVuelo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pasaporte: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      asiento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_reserva: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_classvuelo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, // true = Confirmado, false = Cancelado
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
    await queryInterface.dropTable('DatosVuelo');
  },
};
