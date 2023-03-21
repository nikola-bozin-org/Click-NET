const express = require('express')
const router = express.Router();
const controller = require('../controllers/usersController')
const {validate,hasToken} = require('../helpers/validators'); 

router.get('/users/:id',controller.getUser)
router.get('/users/',controller.getUsers)
// router.post('/users/',validate(hasToken),controller.createUser)
router.post('/users/',controller.createUser)
router.post('/users/changePassword',controller.changePassword)

module.exports=router;