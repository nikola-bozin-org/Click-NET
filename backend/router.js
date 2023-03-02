const express = require('express')
const router = express.Router();
const controller = require('./controller');


router.get('/',controller.getUsers)
router.get('/:id',controller.getUser)
router.post('/',controller.createUser)

router.post('/user/auth/',controller.authenticateUser)
router.patch('/user/payment/:id',controller.payment)
router.get('/user/balance/:id',controller.getUserBalance)
router.get('/user/discount/:id',controller.getUserDiscount)
router.get('/user/xp/:id',controller.getUserXp)
router.get('/user/payments/:id',controller.getUserPayments)
router.get('/user/sessions/:id',controller.getUserSessions)


module.exports=router;