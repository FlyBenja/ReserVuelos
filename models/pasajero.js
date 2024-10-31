// models/pasajero.js
module.exports = (sequelize, DataTypes) => {
  const Pasajero = sequelize.define('Pasajero', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    reservaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reservas',
        key: 'id',
      },
    },
  });

  Pasajero.associate = (models) => {
    Pasajero.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Pasajero.belongsTo(models.Reserva, {
      foreignKey: 'reservaId',
      as: 'reserva',
    });
  };

  return Pasajero;
};
