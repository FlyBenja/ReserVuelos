module.exports = (sequelize, DataTypes) => {
  const Pasajero = sequelize.define('Pasajero', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pasaporte: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    asiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reservaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reserva',
        key: 'id',
      },
    },
  });

  Pasajero.associate = (models) => {
    Pasajero.belongsTo(models.Reserva, {
      foreignKey: 'reservaId',
      as: 'reserva',
    });
  };

  return Pasajero;
};
