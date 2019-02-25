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
  Bookmark.associate = function (models) {
    models.Bookmark.belongsTo(models.Book, {foreignKey:'book_id'});
    models.Bookmark.belongsTo(models.User, {foreignKey:'user_id'});
  }
  return Bookmark;
}
