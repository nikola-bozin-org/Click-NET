const express = require('express')
const router = express.Router();
const controller = require('../controllers/cashRegisterController');



router.post('/openCashRegisterSession',controller.openCashRegisterSession);
router.post('/closeCashRegisterSession',controller.closeCashRegisterSession);
router.get('/getCurrentSession',controller.getCurrentSession);
router.get('/getCurrentSessionPayments',controller.getCurrentSessionPayments);
router.get('/getSessions',controller.getSessions)
router.get('/getPaymentsFromTo',controller.getPaymentsFromTo)
router.get('/calculateTrafficFromTo',controller.calculateTrafficFromTo)
router.get('/getSessionsOnDay',controller.getSessionsOnDay)
router.get('/calculateTrafficOnDay',controller.calculateTrafficOnDay)




module.exports=router;