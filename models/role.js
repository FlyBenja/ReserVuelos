// models/role.js

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      nombreRole: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  
    Role.associate = (models) => {
      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users',
      });
    };
  
    return Role;
  };
  