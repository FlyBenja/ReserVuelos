// migrations/create-pasajero.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
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
          model: 'Users', // Nombre de la tabla Users
          key: 'id',
        },
        allowNull: false,
        unique: true,
      },
      reservaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Reservas', // Nombre de la tabla Reservas
          key: 'id',
        },
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pasajeros');
  },
};
