"use strict";
const express = require("express");
const router = express.Router();
const usersRouter = require('../controllers/user');
const bookRouter = require('../controllers/book');
console.log('usersRouter',usersRouter)
router.use('/users', usersRouter);
router.use('/books', bookRouter);
router.get('/', function(req, res,next) {
    console.log('==========');
    console.log('get / starting');
    console.log('==========');
    res.send('bad request :( ');
});
module.exports = router;
