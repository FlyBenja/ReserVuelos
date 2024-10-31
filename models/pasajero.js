// models/pasajero.js
module.exports = (sequelize, DataTypes) => {
  const Pasajero = sequelize.define('Pasajero', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    pasaporte: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numeroVuelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    claseVuelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
