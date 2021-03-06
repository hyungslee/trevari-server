var express = require('express');
var router = express.Router();
var models = require('../models');
var bookModel = models.Book;
var reviewModel = models.Review;
var cors = require('cors');
var sequelize = require('sequelize');
router.use(cors());
console.log('============== review controller OK ==============');
router.post('/review', async (req, res, next) => {
  if (req.body.userId && req.body.bookId) {
    await reviewModel
      .create({
        user_id: req.body.userId,
        book_id: req.body.bookId,
        score: req.body.score,
        text: req.body.text,
      })
      .then((review) => {
        models.Book.updateScoreOfId(models, req.body.bookId);
        res.send(true);
      })
      .catch((error) => {
        res.sendStatus(404);
        console.error(error);
      });
  } else {
    res.sendStatus(404);
  }
});

router.delete('/review', async (req, res, next) => {
  if (req.query.userId && req.query.bookId) {
    await reviewModel
      .destroy({
        where: {
          user_id: req.query.userId,
          book_id: req.query.bookId,
        },
      })
      .then((del) => {
        models.Book.updateScoreOfId(models, req.query.bookId);
        res.send(true);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(404);
      });
  } else {
    res.sendStatus(400);
  }
});

router.put('/review', async (req, res, next) => {
  if (req.body.userId && req.body.bookId && req.body.text && req.body.score) {
    await reviewModel
      .update(
      {
        text: req.body.text,
        score: req.body.score,
      },
      {
        where: {
          user_id: req.body.userId,
          book_id: req.body.bookId,
        },
      },
      )
      .then((update) => {
        if (update) {
          models.Book.updateScoreOfId(models, req.body.bookId);
          res.send(true);
        } else {
          res.send(false);
        }
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(400);
      });
  } else {
    res.sendStatus(400);
  }
});
router.get('/book-id', async (req, res, next) => {
  if (req.query.bookId) {
    await reviewModel
      .findAll({
        where: {
          book_id: req.query.bookId,
        },
        include: [models.User],
      })
      .then((x) => {
        res.send(x);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(404);
      });
  } else {
    res.sendStatus(400);
  }
});
router.get('/my-reviews', async (req, res, next) => {
  if (req.query.userId) {
    const result = await reviewModel.findAll({
      where: {
        user_id: req.query.userId,
      },
      include: [bookModel],
        offset: Number(req.query.offset),
        limit: 10,
    });
    res.send(result);
  } else {
    res.sendStatus(400);
  }
});
router.get('/all', async(req, res, next)=>{
  await reviewModel.findAll()
      .then((reviews)=>{res.send(reviews)})
      .catch((error)=>{
        console.log(error);
        next();
      })
})
module.exports = router;
