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
    pasajero_id: { // Este debe ser opcional
      type: DataTypes.INTEGER,
      references: {
        model: 'Pasajeros',
        key: 'id',
      },
      allowNull: true, // Permitir nulos
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

  Reserva.associate = (models) => {
    Reserva.belongsTo(models.Pasajero, {
      foreignKey: 'pasajero_id',
      as: 'pasajero',
    });
  };

  return Reserva;
};
