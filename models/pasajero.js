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
      as: 'usuario', // Cambia el alias para evitar confusiones
    });

    // Si necesitas que un pasajero tenga muchas reservas:
    Pasajero.hasMany(models.Reserva, {
      foreignKey: 'pasajero_id', // Asegúrate de que el nombre del campo coincida
      as: 'reservas', // Alias para las reservas
    });
  };

  return Pasajero;
};
