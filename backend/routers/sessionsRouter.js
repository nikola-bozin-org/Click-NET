const express = require('express')
const router = express.Router();
const controller = require('../controllers/sessionController');


router.post('/login',controller.loginUser);
router.post('/logout',controller.logoutUser);
router.get('/logedInUsers',controller.getLoggedInUsers);

module.exports=router;

