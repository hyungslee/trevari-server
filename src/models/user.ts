'use strict';
// src/models/user.ts
import sequelize from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: 'updatedAt',
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  User.associate = function (models) {
    models.User.hasMany(models.Bookmark, { foreignKey: 'user_id', sourceKey: 'id' });
    models.User.hasMany(models.Review, { foreignKey:'user_id', sourceKey:'id' });
  };
  return User;
};
