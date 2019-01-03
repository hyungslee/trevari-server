import express from 'express';
const router = express.Router();
const models = require('../models');
const bookModel = models.Book;
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());
console.log('============== book controller OK ==============');
console.log('book model', bookModel);
router.post('/searchByTitle', async(req, res, next) => {
  if (req.body.input && typeof req.body.input === 'string') {
    const result = await bookModel.findAll({where: {
      title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + req.body.input.toLowerCase() + '%'),
    }}).catch((error)=>{
        console.error(error);
        res.send(404);
    });
    console.log(result);
    res.send(result);
  } else {
    res.sendStatus(400);
  }
});

router.post('/searchByAuthor', async(req, res, next) => {
  if (req.body.input && typeof req.body.input === 'string') {
    const result = await bookModel.findAll({where: {
      author: sequelize.where(sequelize.fn('LOWER', sequelize.col('author')), 'LIKE', '%' + req.body.input.toLowerCase() + '%'),
    }}).catch((error)=>{
        res.send(404);
        console.error(error)
    });
    console.log(result);
    res.send(result);
  } else {
    res.sendStatus(400);
  }
});

router.post('/searchByISBN', async(req, res, next) => {
  if (req.body.input && typeof req.body.input === 'string') {
    const result = await bookModel.findOne({where: {
                isbn: req.body.input,
            }}).catch(error => {
              res.send(404)
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

router.post('/importData', async(req, res, next) => {
  const date = new Date().toISOString().slice(0, 10).replace('-', '').replace('-', '');
  console.log(date, Number(date));
  const result = await bookModel.create({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    publisher:req.body.publisher,
    isbn:req.body.isbn,
    image:req.body.image,
    publishedAt:Number(date),
  });
  res.send(result);
});
router.post('/getBookById', async(req, res, next) => {
    console.log(Number(req.body.id))
  if (req.body.id) {
    const result = await bookModel.findOne({where:
                {
                    id:Number(req.body.id)
                }}
        ).then((book)=>{
            console.log(book);
            res.send(book);
        })
        .catch((error) => {
          console.error(error);
        });

  } else {
      next()
    res.sendStatus(400);
  }

});

module.exports = router;
