var express = require('express');
var router = express.Router();
var models = require('../models');
var bookModel = models.Book;
var cors = require('cors');
var sequelize = require('sequelize');

router.use(cors());
console.log('============== book controller OK ==============');
console.log('book model', bookModel);
router.get('/search/title', async (req, res, next) => {
  if (req.body.input && typeof req.body.input === 'string') {
    const result = await bookModel
      .findAll({
        where: {
          title: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('title')),
            'LIKE',
            `%${req.body.input.toLowerCase()}%`,
          ),
        },
          offset:req.body.offset,
          limit:30
      })
      .catch((error) => {
        console.error(error);
        res.send(404);
      });
    res.send(result);
  } else {
    res.sendStatus(400);
  }
});

router.get('/search/author', async (req, res, next) => {
  if (req.body.input && typeof req.body.input === 'string') {
    const result = await bookModel
      .findAll({
        where: {
          author: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('author')),
            'LIKE',
            `%${req.body.input.toLowerCase()}%`,
          ),
        },
          offset:req.body.offset,
          limit:30
      })
      .catch((error) => {
        res.send(404);
        console.error(error);
      });
    res.send(result);
  } else {
    res.sendStatus(400);
  }
});

router.get('/search/isbn', async (req, res, next) => {
  if (req.body.input && typeof req.body.input === 'string') {
    const result = await bookModel
      .findOne({
        where: {
          isbn: req.body.input,
        },
      })
      .catch((error) => {
        res.send(404);
        console.log(error);
      });
    console.log(result);
    if (result) {
      res.send(result);
    } else {
      res.send([]);
    }
  } else {
    res.sendStatus(400);
  }
});

router.post('/importData', async (req, res, next) => {
  const result = await bookModel
    .create({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      publisher: req.body.publisher,
      isbn: req.body.isbn,
      image: req.body.image,
      publishedAt: Number(req.body.publishedAt),
    })
    .catch((error) => {
      res.sendStatus(400);
      console.error('import error:', error);
    });
  res.send(result);
});
router.get('/id', async (req, res, next) => {
  if (req.body.id) {
    const result = await bookModel
      .findOne({
        where: {
          id: Number(req.body.id),
        },
      })
      .then((book) => {
        console.log(book);
        res.send(book);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    next();
    res.sendStatus(400);
  }
});

module.exports = router;
