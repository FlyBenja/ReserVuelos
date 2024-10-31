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
    pasajero_id: { // Este debe estar aquí
      type: DataTypes.INTEGER,
      references: {
        model: 'Pasajeros',
        key: 'id',
      },
      allowNull: true, // Cambia a true si puedes tener reservas sin pasajero
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
