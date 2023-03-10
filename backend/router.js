const express = require('express')
const router = express.Router();
const controller = require('./controller');





router.post('/user/payment',controller.payment)





module.exports=router;