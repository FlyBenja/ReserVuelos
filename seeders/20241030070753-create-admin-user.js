'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [results] = await queryInterface.sequelize.query(
      "SELECT * FROM Users WHERE username = 'admin'"
    );

    if (results.length === 0) {
      const hashedPassword = await bcrypt.hash('admin', 10); // Hashea la contraseña

      await queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: hashedPassword,
        roleId: 1, // Asegúrate de que el rol con ID 1 existe
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};
