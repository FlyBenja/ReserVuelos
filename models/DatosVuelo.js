// models/datosVuelo.js

module.exports = (sequelize, DataTypes) => {
  const DatosVuelo = sequelize.define('DatosVuelo', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reserva_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    clasevuelo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pasaporte: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    asiento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numero_vuelo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observaciones: { // Nuevo campo "observaciones"
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  DatosVuelo.associate = (models) => {
    DatosVuelo.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    DatosVuelo.belongsTo(models.Reserva, { foreignKey: 'reserva_id', as: 'reserva' });
    DatosVuelo.belongsTo(models.ClaseVuelo, { foreignKey: 'clasevuelo_id', as: 'claseVuelo' });
  };

  return DatosVuelo;
};
