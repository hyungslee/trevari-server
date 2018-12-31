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
      console.log(req.body.userId)
    const result = await models.Book.findOne({where:{
                isbn:req.body.isbn,
            }}).then(async (book)=>{
                console.log(book.id, req.body);
                if (book.id && req.body.userId){
                    var resultado = await bookmarkModel.create({
                        user_id:req.body.userId,
                        book_id:book.id,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }).catch((error)=>{
                        console.error(error)
                        next()
                    })
                }
    });
    res.send(true);
  } else {
    res.send('bad request');
    res.status(400);
  }

});

module.exports = router;
