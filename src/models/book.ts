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
      allowNull:true,
    },
    averageScore: {
      type: DataTypes.FLOAT,
      allowNull:true,
      defatultValue:0.0,
    },
  },
    {
      timestamps: false,
    });
  Book.associate = function (models) {
    models.Book.hasMany(models.Bookmark, { foreignKey: 'book_id', sourceKey:'id' });
    models.Book.hasMany(models.Review, { foreignKey:'book_id', sourceKey:'id' });
  };
  Book.updateScoreOfId = async function (models, id) {
    console.log(id)
    const result = await models.Review.findAll({
      where: {
        book_id:id,
      },
    }).then((data) => {
      if (data.length) {
        const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
        const scoreArr = data.map((x) => {
          return x.score;
        }) ;
        const avgScore = average(scoreArr);
        console.log(avgScore);
        return avgScore;
      }
    }).then(async(score) => {
      Book.update({
        'score':score,
      }, {where : {
          'id':id
                  }});
    });
    console.log('updated score',result)

  };
  return Book;
};
