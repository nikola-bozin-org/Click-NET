const express = require('express')
const router = express.Router();
const controller = require('../controllers/reportsGeneratorController');



router.get('/generateZReport',controller.generateZReport)



module.exports=router;