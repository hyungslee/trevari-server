'use strict';
var express = require('express');
var router = express.Router();
const usersRouter = require('../controllers/user');
const bookRouter = require('../controllers/book');
const reviewRouter = require('../controllers/review');
const bookmarkRouter = require('../controllers/bookmark');
router.use('/bookmarks', bookmarkRouter);
router.use('/users', usersRouter);
router.use('/books', bookRouter);
router.use('/reviews', reviewRouter);
router.get('/', (req, res, next) => {
  res.sendStatus(400);
});
module.exports = router;
