const express = require('express')
const router = express.Router();
const controller = require('../controllers/gamesController');

router.post('/', controller.addGame)

router.get('/',controller.allGames)
router.get('/:id',controller.gameImage)

module.exports=router;