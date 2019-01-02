import express from 'express';
const router = express.Router();
const models = require('../models');
const bookmarkModel = models.Bookmark;
const userModel = models.User;
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());
console.log('============== bookmark controller OK ==============');

router.get('/getMyBookmarks',  (req, res, next) => {

  console.log(bookmarkModel);
  res.send('hello!');
});
router.post('/addBookmark',  async (req, res, next) => {
    // console.log(userModel)
  if (req.body.userId && req.body.isbn) {
    const result = await models.Book.findOne({where:{
                isbn:req.body.isbn,
            }}).then(async (book) => {
              if (book.id && req.body.userId) {
                const resultado = await bookmarkModel.create({
                        user_id:req.body.userId,
                        book_id:book.id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }).catch((error) => {
                      console.error(error);
                      next();
                    });
              }
            });
    res.send(true);
  } else {
    res.send('bad request');
    res.status(400);
  }
});

router.post('/deleteBookmark', async(req, res, next) => {
    // console.log(req.url)
  if (req.body.isbn && typeof req.body.isbn === 'string' && req.body.userId) {
      const r = await models.Book.findOne({where:
              {isbn:req.body.isbn,}
        }).then(async (book) => {
          const result = await bookmarkModel.destroy({where:
                    {
                        user_id:req.body.userId,
                        book_id:book.id,
                    },
            }).catch(error => {
              res.send(false);
            });
          if (result){
              res.send(true)
          } else {
              res.send(false)
          }
          //res.send(true);
        });
    } else {
      res.sendStatus(400);
      res.send(false);
    }
});

module.exports = router;
