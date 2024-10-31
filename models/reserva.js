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
    user_id: { // Ahora referencia a Users
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  Reserva.associate = (models) => {
    Reserva.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user', // Cambié el alias
    });
  };

  return Reserva;
};
