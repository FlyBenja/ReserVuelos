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
          model: 'Users', // Asegúrate de que el nombre de la tabla de usuarios sea 'Users'
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      pasaporte: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      asiento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reserva_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Reservas', // Nombre de la tabla de reservas
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      clasevuelo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ClaseVuelos', // Nombre de la tabla de clases de vuelo
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('DatosVuelos'); // Elimina la tabla 'DatosVuelos' al revertir
  },
};
