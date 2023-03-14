const express = require('express')
const router = express.Router();
const controller = require('../controllers/cashRegisterController');



router.post('/openCashRegisterSession',controller.openCashRegisterSession);
router.get('/getCurrentSession',controller.getCurrentSession);
router.post('/closeCashRegisterSession',controller.closeCashRegisterSession);
router.get('/getSessions',controller.getSessions)
router.get('/getPaymentsFromTo',controller.getPaymentsFromTo)
router.get('/calculateTrafficFromTo',controller.calculateTraffic)
router.get('/getSessionsOnDay',controller.getSessionsOnDay)
router.get('/calculateTrafficOnDay',controller.calculateTrafficOnDay)
router.get('/createDummySessions',controller.createDummySessions)




module.exports=router;