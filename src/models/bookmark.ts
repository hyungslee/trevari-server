'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    id : {
      primaryKey:true,
      type:DataTypes.INTEGER,
      autoIncrement:true,
      unique: true,
    },
    book_id : {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    user_id : {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Bookmark;
};
