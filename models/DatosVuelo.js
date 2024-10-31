// models/DatosVuelo.js
module.exports = (sequelize, DataTypes) => {
  const DatosVuelo = sequelize.define('DatosVuelo', {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pasaporte: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    asiento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_reserva: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_classvuelo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  DatosVuelo.associate = (models) => {
    DatosVuelo.belongsTo(models.Reserva, {
      foreignKey: 'id_reserva',
      as: 'reserva',
    });
    DatosVuelo.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'usuario',
    });
    DatosVuelo.belongsTo(models.ClaseVuelo, {
      foreignKey: 'id_classvuelo',
      as: 'claseVuelo',
    });
  };

  return DatosVuelo;
};
