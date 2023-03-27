const express = require('express')
const router = express.Router();
const controller = require('../controllers/zonesController')


router.get('/getPCZones',controller.getPCZones)
router.post('/createPCZone',controller.createPCZone);


module.exports = router;