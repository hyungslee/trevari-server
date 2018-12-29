'use strict';
module.exports = (sequelize, DataTypes) => {
    var Bookmark = sequelize.define('Bookmark', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Bookmark.associate = function (models) {
        models.Bookmark.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Bookmark;
};
