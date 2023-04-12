const express = require('express')
const router = express.Router();
const controller = require('../controllers/utilsController')


router.get('/PCLimit',controller.getPCLimit)
router.post('/PCLimit',controller.setPCLimit)

module.exports=router;