import express from 'express';
const router = express.Router();
const models = require('../models');
const userModel = models.User;
const cors = require('cors');
router.use(cors());
console.log('============== user controller OK ==============');

router.get('/', (req, res) => {
  console.log(req.method);
  res.status(200);
  res.send('hi');
});

router.post('/signup', async (req, res, next) => {
  if (req.body.email && req.body.name && req.body.password && req.body.phoneNumber) {
    const result = await userModel.create({
      email:req.body.email,
      name:req.body.name,
      password:req.body.password,
      phoneNumber:req.body.phoneNumber,
    });
    res.send(result);
  } else {
    res.send(false);
    res.status(400);
  }
});

router.post('/checkEmailAvailability', async(req, res, next) => {
  if (req.body.email) {
    const result = await userModel.findAll({where:{
      email:req.body.email,
    }});
    if (result.length) {
      res.send(false);
    } else {
      res.send(true);
    }
  }
});

router.post('/login', async(req, res, next) => {
  if (req.body.email && req.body.password) {
    const result = await userModel.findOne({where:{
      email:req.body.email,
      password:req.body.password,
    }});
    if (result){
        res.send(true)
    } else {
        res.send(false)
    }
  }
});

router.post('/updatePassword', async(req, res, next)=>{
  if (req.body.password && req.body.email){
    const result = await userModel.update({password:req.body.password},{where:{email:req.body.email}});
    console.log(result)
    res.send(result)
  }
})
module.exports = router;
