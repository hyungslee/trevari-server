import express from 'express';
const router = express.Router();
const models = require('../models');
const bookmarkModel = models.Bookmark;
const cors = require('cors');
router.use(cors());
console.log('============== bookmark controller OK ==============');
router.post('/bookmark',  async (req, res, next) => {
  if (req.body.userId && req.body.bookId) {
    await models.Bookmark.create({
      user_id:req.body.userId,
      book_id:req.body.bookId,
    }).then((x) => {
      res.status(200);
      res.send(true);
      models.Book.updateBookmarkCount(models,req.body.bookId);
    }).catch((error) => {
      console.error(error);
      res.sendStatus(400);
    });
  } else {
    res.sendStatus(400);
  }
});

router.delete('/bookmark', async(req, res, next) => {
  if (req.body.userId &&  req.body.bookmarkId) {
    await bookmarkModel.destroy({
      where:{
        id: req.body.bookmarkId,
      },
    }).then(() => {
      res.send(true);
    }).catch((error) => {
      console.error(error);
      res.sendStatus(404);
    });
  } else {
    res.sendStatus(400);

  }
});
router.get('/my-bookmarks', async(req, res, next) => {
  if (req.query.userId) {
    await bookmarkModel.findAll({
      where: {
        user_id: req.query.userId,
      },
      include: [models.Book],
        offset: req.query.offset,
        limit: 30,
    }).then((result) => {
      res.send(result);
    });

  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
