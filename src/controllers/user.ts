var express = require('express');
var router = express.Router();
var models = require('../models');
var userModel = models.User;
var cors = require('cors');
router.use(cors());
console.log('============== user controller OK ==============');

router.post('/user', async (req, res, next) => {
  if (req.body.email && req.body.name && req.body.password && req.body.phoneNumber) {
    const result = await userModel.create({
      email:req.body.email,
      name:req.body.name,
      password:req.body.password,
      phoneNumber:req.body.phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.send(result);
  } else {
    res.send(false);
    res.status(400);
  }
});

router.get('/email', async(req, res, next) => {
  if (req.query.email) {
    const result = await userModel.findAll({where:{
      email:req.query.email,
    }});
    if (result.length) {
      res.send(false);
    } else {
      res.send(true);
    }
  }
});

router.get('/user', async(req, res, next) => {
  if (req.query.email && req.query.password) {
    const result = await userModel.findOne({where:{
      email:req.query.email,
      password:req.query.password,
    }});
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  } else {
    res.sendStatus(400);
  }
});

router.put('/password', async(req, res, next) => {
  if (req.body.password && req.body.userId) {
    const result = await userModel.update({ password:req.body.password },
                                          { where:{ id:req.body.userId } });
    if (result[0] === 1) {
      res.send(true);
    } else {
      res.send(false);
    }
  }
});
router.put('/phone-number', async(req, res, next) => {
  if (req.body.phoneNumber && req.body.userId) {
    const result = await userModel.update({ phoneNumber:req.body.phoneNumber },
                                          { where:{ id:req.body.userId } });
    if (result[0] === 1) {
      res.send(true);
    } else {
      res.send(false);
    }
  }
});
module.exports = router;
