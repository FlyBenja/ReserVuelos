// migrations/20241029123456-create-datosvuelo.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DatosVuelos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nombre de la tabla de usuarios
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      reserva_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Reservas',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      clasevuelo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ClaseVuelos',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      pasaporte: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      asiento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero_vuelo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      observaciones: { // Nuevo campo "observaciones"
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
    await queryInterface.dropTable('DatosVuelos');
  },
};
