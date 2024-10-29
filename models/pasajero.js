module.exports = (sequelize, DataTypes) => {
  const Pasajero = sequelize.define('Pasajero', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pasaporte: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    asiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Cliente',
    },
    reservaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reserva',
        key: 'id',
      },
    },
  });

  Pasajero.associate = (models) => {
    Pasajero.belongsTo(models.Reserva, {
      foreignKey: 'reservaId',
      as: 'reserva',
    });
  };

  return Pasajero;
};
