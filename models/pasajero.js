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
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  });

  Pasajero.associate = (models) => {
    Pasajero.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user',
    });
  };

  return Pasajero;
};
