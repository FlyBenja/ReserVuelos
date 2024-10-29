module.exports = (sequelize, DataTypes) => {
  const Reserva = sequelize.define('Reserva', {
    codigoReserva: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fechaReserva: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    claseVueloId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ClaseVuelo',
        key: 'id',
      },
    },
  });

  Reserva.associate = (models) => {
    Reserva.hasMany(models.Pasajero, {
      foreignKey: 'reservaId',
      as: 'pasajeros',
    });
    Reserva.belongsTo(models.ClaseVuelo, {
      foreignKey: 'claseVueloId',
      as: 'claseVuelo',
    });
  };

  return Reserva;
};
