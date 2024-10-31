// migrations/XXXXXX-create-pasajeros.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pasajeros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Asegúrate de que el nombre de la tabla sea correcto
          key: 'id',
        },
        allowNull: false,
        unique: true,
      },
      reservaId: { // Asegúrate de que este campo sea opcional
        type: Sequelize.INTEGER,
        allowNull: true, // Cambiado a true para permitir nulos
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pasajeros');
  },
};
