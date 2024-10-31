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
    estado: { // Estado de la reserva
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  return Reserva;
};
