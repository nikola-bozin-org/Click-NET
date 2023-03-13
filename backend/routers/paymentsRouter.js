const express = require('express')
const router = express.Router();
const controller = require('../controllers/paymentsController');


router.post('/buyTicket',controller.buyTicket);
router.post('/addUserBalance',controller.addUserBalance)

module.exports = router;
