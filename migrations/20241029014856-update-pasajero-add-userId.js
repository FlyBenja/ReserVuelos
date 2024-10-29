module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Pasajeros', 'id_user', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pasajeros', 'id_user');
  },
};
