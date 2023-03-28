const express = require('express')
const router = express.Router();
const controller = require('../controllers/userController');


router.get('/balance/:id',controller.getUserBalance)
router.get('/discount/:id',controller.getUserDiscount)
router.get('/xp/:id',controller.getUserXp)
router.get('/payments/:id',controller.getUserPayments)
router.get('/role/:id',controller.getUserRole)
router.get('/basicInfo/:id',controller.getUserBasicInfo)
router.get('/actions/:id',controller.getActions)
router.get('/tickets/:id',controller.getTickets)

module.exports = router;