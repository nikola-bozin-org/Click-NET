const express = require('express')
const router = express.Router();
const controller = require('../controllers/utilsController')


router.get('/',controller.getUtility)
router.put('/centerName',controller.setUtilityCenterName)
router.put('/pcLimit',controller.setUtilityPCLimit)
router.post('/',controller.createUtility)

module.exports=router;