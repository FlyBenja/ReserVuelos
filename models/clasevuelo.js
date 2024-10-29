module.exports = (sequelize, DataTypes) => {
  const ClaseVuelo = sequelize.define('ClaseVuelo', {
    nombreClase: {
      type: DataTypes.STRING,
      allowNull: false,
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
