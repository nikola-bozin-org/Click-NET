const express = require('express')
const router = express.Router();
const controller = require('../controllers/paymentsController');


router.post('/buyTicket',controller.buyTicket);
router.post('/payment',controller.payment)
router.post('/refund',controller.refund)
router.post('/getPaymentByReceipt',controller.getPaymentByReceipt)

module.exports = router;
