// src/models/book.ts

'use strict';
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        isbn:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        image:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        publishedAt:{
            type: DataTypes.INTEGER,
            allowNull:true
        }
    },
        {
            timestamps: false
        })
    console.log(Book)
    return Book;
};
