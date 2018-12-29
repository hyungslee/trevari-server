import express from 'express';
const router = express.Router();
const models = require('../models');
const bookModel = models.Book;
const cors = require('cors');
let sequelize = require('sequelize')
router.use(cors());
console.log('============== book controller OK ==============');
console.log('book model',bookModel)
router.post('/searchByTitle', async(req, res, next)=>{
    if (req.body.input && typeof req.body.input === 'string'){
        const result = await bookModel.findAll({where: {
                title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + req.body.input.toLowerCase() + '%')
            }});
        console.log(result);
        res.send(result);
    } else {
        res.status(400)
    }
});

router.post('/searchByAuthor', async(req, res, next)=>{
    if (req.body.input && typeof req.body.input === 'string'){
        const result = await bookModel.findAll({where: {
                author: sequelize.where(sequelize.fn('LOWER', sequelize.col('author')), 'LIKE', '%' + req.body.input.toLowerCase() + '%')
            }});
        console.log(result);
        res.send(result);
    } else {
        res.status(400)
    }
});

router.post('/searchByISBN', async(req, res, next)=>{
    if (req.body.input && typeof req.body.input === 'string'){
        const result = await bookModel.findOne({where: {
                isbn: req.body.input
            }});
        console.log(result);
        if (result){
            res.send(result);
        } else {
            res.send([])
        }

    } else {
        res.status(400)
    }
});

module.exports = router;
