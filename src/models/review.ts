'use strict';
// src/models/user.ts
var sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    score: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull:true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    book_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
      createdAt: {
          type : DataTypes.DATE,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      }
  });
  Review.associate = function(models){
    models.Review.belongsTo(models.Book, {foreignKey: 'book_id'});
    models.Review.belongsTo(models.User, {foreignKey: 'user_id'});
  };
  return Review;
};
