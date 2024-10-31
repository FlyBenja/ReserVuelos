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
      user_id: { // Cambié esto para hacer referencia al usuario
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Asegúrate de que el nombre de la tabla sea correcto
          key: 'id',
        },
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
    await queryInterface.dropTable('Reservas');
  },
};
