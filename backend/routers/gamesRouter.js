const express = require('express')
const router = express.Router();
const controller = require('../controllers/gamesController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
      cb(null,Date.now() +'_'+ file.originalname)
    }
  })
const upload = multer({ storage: storage });
router.post('/',upload.single('game-image'),controller.addGame)
router.get('/',controller.allGames)

module.exports=router;