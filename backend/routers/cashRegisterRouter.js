const express = require('express')
const router = express.Router();
const controller = require('../controllers/cashRegisterController');



router.post('/openCashRegisterSession',controller.openCashRegisterSession);
router.get('/getCashRegisterSessions',controller.getCashRegisterSessions);
router.post('/closeCashRegisterSession',controller.closeCashRegisterSession);




module.exports=router;