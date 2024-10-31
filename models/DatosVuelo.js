// models/DatosVuelo.js
module.exports = (sequelize, DataTypes) => {
    const DatosVuelo = sequelize.define('DatosVuelo', {
      id_user: {
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
      reserva_id: { // Relación con reserva
        type: DataTypes.INTEGER,
        references: {
          model: 'Reservas',
          key: 'id',
        },
        allowNull: false,
      },
      id_classvuelo: { // Campo para identificar la clase de vuelo
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    DatosVuelo.associate = (models) => {
      DatosVuelo.belongsTo(models.Reserva, {
        foreignKey: 'reserva_id',
        as: 'reserva',
      });
    };
  
    return DatosVuelo;
  };
  