const express = require('express')
const router = express.Router();
const controller = require('../controllers/zonesController')
const {validate,hasToken,tokenIsValid} = require('../helpers/validators'); 


router.get('/getPCZones',controller.getPCZones)
router.post('/createPCZone',validate(hasToken,tokenIsValid),controller.createPCZone);


module.exports = router;