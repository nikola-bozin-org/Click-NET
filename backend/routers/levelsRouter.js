const express = require('express')
const router = express.Router();
const controller = require('../controllers/levelsController');


router.post('/',controller.addLevel);
router.put('/',controller.updateLevelXP);
router.delete('/',controller.deleteLevel);
router.get('/',controller.getLevels);
router.get('/:level',controller.getLevel)
// router.put('/createDefaultLevels',controller.createDefaultLevels)

module.exports = router;