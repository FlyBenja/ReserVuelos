module.exports = (sequelize, DataTypes) => {
  const ClaseVuelo = sequelize.define('ClaseVuelo', {
    nombreClase: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Asegura la unicidad en el nivel de modelo también
    },
  });

  ClaseVuelo.associate = (models) => {
    ClaseVuelo.hasMany(models.Reserva, {
      foreignKey: 'claseVueloId',
      as: 'reservas',
    });
  };

  return ClaseVuelo;
};