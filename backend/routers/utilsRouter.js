const express = require('express')
const router = express.Router();
const controller = require('../controllers/utilsController')

router.get('/workstationLimit',controller.workstationLimit)
router.get('/',controller.getUtility)
router.put('/centerName',controller.setUtilityCenterName)
router.put('/workstationLimit',controller.setUtilityPCLimit)
router.post('/',controller.createUtility)

module.exports=router;