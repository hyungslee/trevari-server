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
        allowNull: false,
      },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    publisher: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    publishedAt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    averageScore: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defatultValue: 0.0,
      },
  },
    {
      timestamps: false,
    });
  Book.associate = function (models) {
    models.Book.hasMany(models.Bookmark, { foreignKey: 'book_id', sourceKey: 'id' });
    models.Book.hasMany(models.Review, { foreignKey: 'book_id', sourceKey: 'id' });
  };
  Book.updateScoreOfId = async (models, id) => {
    const result = await sequelize.query(`SELECT AVG(score) FROM Reviews where book_id = ${id}`)
            .spread(async(res, meta) => {
              const newAvgScore = res[0]['AVG(score)'];
              console.log(newAvgScore)
              const update = models.Book.update({
                    averageScore:newAvgScore,
                },{ where:{ id } },
                ).then('updated!').catch('update error');
            });
  };
  return Book;
};
