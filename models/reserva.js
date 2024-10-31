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
    pasajero_id: { // Cambié esto para hacer referencia al pasajero
      type: DataTypes.INTEGER,
      references: {
        model: 'Pasajeros', // Asegúrate de que el nombre de la tabla sea correcto
        key: 'id',
      },
      allowNull: false,
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
