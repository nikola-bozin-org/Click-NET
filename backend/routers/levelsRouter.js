const express = require('express')
const router = express.Router();
const controller = require('../controllers/levelsController');


router.post('/levels',controller.addLevel);
router.put('/levels',controller.updateLevelXP);
router.delete('/levels',controller.deleteLevel);
router.get('/levels',controller.getLevels);
router.get('/levels/:level',controller.getLevel)

module.exports = router;