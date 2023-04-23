const express = require('express')
const router = express.Router();
const controller = require('../controllers/workstationsController')


router.post('/',controller.addWorkstation);
router.post('/wakeUp',controller.wakeUp)


module.exports=router;