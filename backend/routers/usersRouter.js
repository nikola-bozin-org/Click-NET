const express = require('express')
const router = express.Router();
const controller = require('../controllers/usersController')


router.get('/users/:id',controller.getUser)
router.get('/users/',controller.getUsers)
router.post('/users/',controller.createUser)


module.exports=router;