const express = require('express')
const router = express.Router();
const controller = require('../../controllers/other/dummyController');




router.get('/createDummyCashRegisterSessions',controller.createDummyCashRegisterSessions)


module.exports = router;