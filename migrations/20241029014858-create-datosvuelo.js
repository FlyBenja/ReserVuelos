// migrations/2024xxxxxx-create-datosvuelo.js
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
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pasaporte: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      asiento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reserva_id: { // FK a la tabla Reserva
        type: Sequelize.INTEGER,
        references: {
          model: 'Reservas',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      id_classvuelo: { // Campo para identificar la clase de vuelo
        type: Sequelize.INTEGER,
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
