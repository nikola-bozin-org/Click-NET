const express = require('express')
const router = express.Router();
const controller = require('../controllers/dropDatabaseController');


router.delete('/dropCashRegisterDatabase',controller.dropCashRegisterDatabase)
router.delete('/dropLevelsDatabase',controller.dropLevelsDatabase)
router.delete('/dropUsersDatabase',controller.dropUsersDatabase)
router.delete('/dropTicketsDatabase',controller.dropTicketsDatabase)





module.exports=router;