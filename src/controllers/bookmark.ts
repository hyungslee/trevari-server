import express from 'express';
const router = express.Router();
const models = require('../models');
const bookmarkModel = models.Bookmark;
const userModel = models.User;
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());
console.log('============== bookmark controller OK ==============');

router.post('/addBookmark',  async (req, res, next) => {
    // console.log(userModel)
  if (req.body.userId && req.body.bookId) {
    const result = await models.Bookmark.create({
          user_id:req.body.userId,
          book_id:req.body.bookId,
      }).then((x) => {
          res.status(200);
          res.send(true);
      }).catch((error) => {
        console.error(error);
        res.sendStatus(400);
      });
    // const result = await models.Book.findOne({where:{
    //             isbn:req.body.isbn,
    //         }}).then(async (book) => {
    //           if (book.id && req.body.userId) {
    //             const resultado = await bookmarkModel.create({
    //                     user_id:req.body.userId,
    //                     book_id:book.id,
    //                     createdAt: new Date(),
    //                     updatedAt: new Date(),
    //                 }).then(x => {
    //                     console.log(x);
    //                     res.send(true);
    //               })
    //                   .catch((error) => {
    //                     console.error(error);
    //                     next();
    //                   });
    //           }
    //         });

  } else {
    res.sendStatus(400);
    // res.send('bad request');

  }
});

router.post('/deleteBookmark', async(req, res, next) => {
    // console.log(req.url)
  if (req.body.userId &&  req.body.bookmarkId) {
    const result = await bookmarkModel.destroy({
          where:{
              id: req.body.bookmarkId,
          },
      }).then(() => {
          res.send(true);
      }).catch((error) => {
        console.log(error);
        res.sendStatus(404);
      });
    // const r = await models.Book.findOne({where:
    //           { isbn:req.body.isbn },
    //     }).then(async (book) => {
    //       const result = await bookmarkModel.destroy({where:
    //                 {
    //                     user_id:req.body.userId,
    //                     book_id:book.id,
    //                 },
    //         }).catch(error => {
    //           res.send(false);
    //         });
    //       if (result) {
    //         res.send(true);
    //       } else {
    //         res.send(false);
    //       }
    //     });
  } else {
    res.sendStatus(400);
    res.send(false);
  }
});
router.post('/getMyBookmarks', async(req, res, next) => {
  if (req.body.userId) {
    const result = await bookmarkModel.findAll({
        where: {
            user_id: req.body.userId,
          },
        include: [models.Book],
      });
    // console.log(req.body.userId);
    // const result = await bookmarkModel.findAll({where:
    //   {
    //     user_id:req.body.userId,
    //   },
    //   }).catch((error) => {
    //     console.error(error);
    //   });
    // console.log('result', result);
    // if (result) {
    //   res.send(result);
    // } else {
    //   res.send([]);
    // }
    console.log(result);
    res.send(result);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
