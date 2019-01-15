var express = require('express');
var router = express.Router();
var models = require('../models');
var bookModel = models.Book;
var cors = require('cors');
var sequelize = require('sequelize');

router.use(cors());
console.log('============== book controller OK ==============');
router.get('/search/title', async (req, res, next) => {
  if (req.query.input && typeof req.query.input === 'string') {
    const result = await bookModel
      .findAll({
        where: {
          title: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('title')),
            'LIKE',
            `%${req.query.input.toLowerCase()}%`,
          ),
        },
        offset: req.query.offset,
        limit: 30,
      })
      .catch(error => {
        console.error(error);
        res.send(404);
      });
    res.send(result);
  } else {
    res.sendStatus(400);
  }
});

router.get('/search/author', async (req, res, next) => {
  if (req.query.input && typeof req.query.input === 'string') {
    const result = await bookModel
      .findAll({
        where: {
          author: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('author')),
            'LIKE',
            `%${req.query.input.toLowerCase()}%`,
          ),
        },
        offset: req.query.offset,
        limit: 30,
      })
      .catch(error => {
        res.send(404);
        console.error(error);
      });
    res.send(result);
  } else {
    res.sendStatus(400);
  }
});

router.get('/search/isbn', async (req, res, next) => {
  if (req.query.input && typeof req.query.input === 'string') {
    const result = await bookModel
      .findOne({
        where: {
          isbn: req.query.input,
        },
      })
      .catch(error => {
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
router.get('/new-release', async (req, res, next) => {
  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - 30));
  const priorDateInt = Number(
    priorDate
      .toISOString()
      .substr(0, 10)
      .match(/\d/g)
      .join(''),
  );
  await bookModel
    .findAll({
      where: {
        publishedAt: {
          [sequelize.Op.gte]: priorDateInt,
        },
      },
      limit: 30,
    })
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      next();
    });
});

router.get('/best-rated', async (req, res, next) => {
  await bookModel
    .findAll({
      order: [['averageScore', 'DESC']],
      limit: 30,
    })
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      next();
    });
});
router.get('/most-bookmarks', async (req, res, next) => {
  await bookModel
    .findAll({
      order: [['bookmarkCount', 'DESC']],
      limit: 30,
    })
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      next();
    });
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
    .catch(error => {
      res.sendStatus(400);
      console.error('import error:', error);
    });
  res.send(result);
});
router.get('/id', async (req, res, next) => {
  if (req.query.id) {
    const result = await bookModel
      .findOne({
        where: {
          id: Number(req.query.id),
        },
      })
      .then(book => {
        console.log(book);
        res.send(book);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    next();
    res.sendStatus(400);
  }
});
router.get('/my-recommendations', async (req, res, next) => {
  await models.Review.findAll({
    where: {
      user_id: req.query.userId,
      score: {
        [sequelize.Op.gte]: 4,
      },
    },
  }).then(async (userReviews) => {
    const bookIDs = Array.from(new Set(userReviews.map(r => r.book_id)));
    await models.Review.findAll({
      where: {
        book_id: {
          [sequelize.Op.in]: bookIDs,
        },
        user_id: {
          [sequelize.Op.ne]: req.query.userId,
        },
      },
    }).then(async (otherUsers) => {
      const otherUserIDs = Array.from(
        new Set(otherUsers.map(user => user.user_id)),
      );
      await models.Review.findAll({
        where: {
          user_id: {
            [sequelize.Op.in]: otherUserIDs,
          },
          book_id: {
            [sequelize.Op.notIn]: bookIDs,
          },
        },
      }).then(async (otherReviews) => {
        const otherBookIDs = Array.from(
          new Set(otherReviews.map(rev => rev.book_id)),
        );
        await models.Book.findAll({
          where: {
            id: {
              [sequelize.Op.in]: otherBookIDs,
            },
          },
        }).then((recommendedBooks) => {
          res.send(recommendedBooks);
        });
      });
    });
  });
});
module.exports = router;
