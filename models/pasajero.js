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
  });

  Pasajero.associate = (models) => {
    Pasajero.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    // Esta relación es para conectar con la Reserva
    Pasajero.hasMany(models.Reserva, { // Un pasajero puede tener múltiples reservas
      foreignKey: 'pasajero_id', // La columna en la tabla 'Reservas' que hará referencia a 'Pasajeros'
      as: 'reservas', // Nombre de la relación
    });
  };

  return Pasajero;
};
