const express = require('express')
const router = express.Router();
const controller = require('../controllers/sessionController');

router.post('/login',controller.loginUser);
router.post('/logout',controller.logoutUser);
router.post('/loginStaff',controller.loginStaff);
router.post('/logoutAllUsers',controller.logoutAllUsers);
router.get('/verifyToken',controller.verifyToken);
router.get('/allSessions',controller.getSessions);
router.post('/logoutUserByStaff',controller.logoutUserByStaff)

module.exports=router;

