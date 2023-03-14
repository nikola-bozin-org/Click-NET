const express = require('express')
const router = express.Router();
const controller = require('../controllers/cashRegisterController');



router.post('/openCashRegisterSession',controller.openCashRegisterSession);
router.get('/getCurrentSession',controller.getCurrentSession);
router.post('/closeCashRegisterSession',controller.closeCashRegisterSession);
router.get('/getSessions',controller.getSessions)



module.exports=router;