const express = require('express')
const router = express.Router();
const controller = require('../controllers/usersController')

router.get('/:id',controller.getUser)
router.get('/',controller.getUsers)
router.post('/createUser',controller.createUser)
router.post('/changePassword',controller.changePassword)
router.delete('/',controller.deleteUser)

module.exports=router;