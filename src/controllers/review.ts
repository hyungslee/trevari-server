import express from 'express';
const router = express.Router();
const models = require('../models');
const bookModel = models.Book;
const reviewModel = models.Review;
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());
console.log('============== review controller OK ==============');

router.post('/addReview', async (req, res, next) => {
  if (req.body.userId && req.body.bookId) {
    const result = await reviewModel.create({
            user_id:req.body.userId,
            book_id:req.body.bookId,
            score: req.body.score,
            text: req.body.text,
        }).then((review) => {
            res.send(true);
        }).catch((error) => {
          res.sendStatus(404);
          console.error(error);
        });
  } else {
    res.sendStatus(404);
  }
});

router.post('/deleteReview', async (req, res, next) => {
  if (req.body.userId && req.body.bookId) {
    const result = await reviewModel.destroy({
            where : {
                user_id: req.body.userId,
                book_id: req.body.bookId,
            },
        }).then((del) => {
            res.send(true);
        }).catch((error) => {
          console.error(error);
          res.sendStatus(404);
        });
  } else {
    res.sendStatus(400);
  }
});

router.post('/editReview', async(req, res, next) => {
  if (req.body.userId && req.body.bookId && req.body.text && req.body.score) {
    const result = await reviewModel.update({
      text:req.body.text,
      score:req.body.score,
    },                                      {
      where:{
        user_id: req.body.userId,
        book_id: req.body.bookId,
      },
    }).then((update) => {
        if (update) {
            res.send(true);
        } else {
            res.send(false);
        }
    }).catch((error) => {
      console.error(error);
      res.sendStatus(400);
    });
  } else {
    res.sendStatus(400);
  }
});

router.post('/getMyReviews', async (req, res, next) => {
    if (req.body.userId){
        const result = await reviewModel.findAll({
            where:{
                user_id: req.body.userId
            },
            include: [bookModel]
        });
        res.send(result)
    } else {
        res.sendStatus(400)
    }
    //let chainer = Sequelize.Utils.QueryChainer;

  // if (req.body.userId) {
  //   let books : BookType[] = [];
  //   const result = await reviewModel.findAll({
  //                 where:{
  //                     user_id:req.body.userId,
  //                 },
  //             }).then((reviews) => {
  //               reviews.forEach(async (review) => {
  //                 const book = await bookModel.findOne({
  //                       where : {
  //                           id:review.book_id,
  //                       },
  //                   }).then((b) => {
  //                     books = [...books, b];
  //                     console.log(books);
  //                   });
  //               });
  //               //res.send(books);
  //             }).then(()=>{
  //                 res.send(books)
  //                 console.log('books',books)
  //   });
  // } else {
  //   res.sendStatus(400);
  // }
});
// type BookType = {
//   'id': number,
//   'title':string,
//   'description':string,
//   'image':string,
//   'author':string,
//   'publishedAt':number,
//     'publisher':string
// };
module.exports = router;
