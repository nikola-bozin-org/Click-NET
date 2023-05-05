const express = require('express')
const router = express.Router();
const controller = require('../controllers/workstationsController')

router.get('/',controller.getWorkstations);
router.post('/',controller.addWorkstation);
router.post('/wakeUp',controller.wakeUp)

module.exports=router;