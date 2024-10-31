// models/reserva.js
module.exports = (sequelize, DataTypes) => {
  const Reserva = sequelize.define('Reserva', {
    codigoReserva: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaFinal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Reserva.associate = (models) => {
    Reserva.hasMany(models.Pasajero, {
      foreignKey: 'reservaId',
      as: 'pasajeros',
    });
  };

  return Reserva;
};
