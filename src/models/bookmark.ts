'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    id : {
      primaryKey:true,
      type:DataTypes.INTEGER,
        auto_increment:true,
    },
    book_id : {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    user_id : {
      type:DataTypes.INTEGER,
        allowNull: false
    }
  });
  // Bookmark.associate = function (models) {
  //   models.User.belongsToMany(models.Book,
  //       {
  //         through:'Bookmark'
  //       });
  //     models.Book.belongsToMany(models.User,
  //         {
  //             through:'Bookmark'
  //         });
  //
  // };
  return Bookmark;
};
