// models/datosVuelo.js

module.exports = (sequelize, DataTypes) => {
  const DatosVuelo = sequelize.define('DatosVuelo', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pasaporte: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reserva_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clasevuelo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
