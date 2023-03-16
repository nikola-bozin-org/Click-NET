const express = require('express')
const router = express.Router();
const controller = require('../controllers/userController');


router.get('/user/balance/:id',controller.getUserBalance)
router.get('/user/discount/:id',controller.getUserDiscount)
router.get('/user/xp/:id',controller.getUserXp)
router.get('/user/payments/:id',controller.getUserPayments)
router.get('/user/sessions/:id',controller.getUserSessions)
router.get('/user/role/:id',controller.getUserRole)
router.get('/user/basicInfo/:id',controller.getUserBasicInfo)
router.get('/user/actions/:id',controller.getActions)
router.get('/user/tickets/:id',controller.getTickets)

module.exports = router;