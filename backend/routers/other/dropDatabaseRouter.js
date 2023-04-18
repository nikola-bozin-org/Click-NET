const express = require('express')
const router = express.Router();
const controller = require('../../controllers/other/dropDatabaseController');


router.delete('/dropCashRegisterDatabase',controller.dropCashRegisterDatabase)
router.delete('/dropLevelsDatabase',controller.dropLevelsDatabase)
router.delete('/dropUsersDatabase',controller.dropUsersDatabase)
router.delete('/dropTicketsDatabase',controller.dropTicketsDatabase)
router.delete('/dropLogedInUsers',controller.dropLogedInUsers)
router.delete('/dropSessions',controller.dropSessions)




module.exports=router;