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

  // Definición de la asociación
  Reserva.associate = (models) => {
    Reserva.hasMany(models.Pasajero, {
      foreignKey: 'reservaId', // Cambia esto si el nombre de la clave foránea es diferente
      as: 'pasajeros', // Alias para la asociación
    });
  };

  return Reserva;
};
