const statusCode = require('../statusCodes')
const jwt = require('../jwt')
const { userRoles } = require('../helpers/enums')
const service = require('../services/gamesService')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only jpg and png images are allowed.'), false);
    }
};
const upload = multer({ storage: storage,fileFilter:fileFilter }).single('game-image');


const addGame = async (req, res) => {
    const token = req.headers.token;
    if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unauthorized." })
    const verifyResult = jwt.verify(token);
    if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token." });
    if (verifyResult.role !== userRoles.Admin) return res.status(statusCode.ERROR).json({ error: "You are not Admin!" });
    upload(req, res, async (err) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: `Server error: ${err}` })
        const { name, category, isEnabled, installationPath, zone } = req.body;
        const result = await service._addGame(name, category, Boolean(isEnabled), installationPath, zone, req.file);
        if (result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: `Server error: ${result.error}` })
        return res.status(statusCode.OK).json({ message: result.message, game: result.game });
    })
}
const allGames = async (req, res) => {
    const token = req.headers.token;
    if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
    const verifyResult = jwt.verify(token);
    if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token" });
    const result = await service._allGames();
    if (result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: `Server error: ${result.error}` })
    return res.status(statusCode.OK).json({ games: result.games });
}
const gameImage = async(req,res)=>{
    const token = req.headers.token;
    if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
    const verifyResult = jwt.verify(token);
    if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token" });
    const id = req.params.id;
    const result = await service._gameImage(id);
    if (result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: `Server error: ${result.error}` })
    res.set('Content-Type', result.image.image.contentType);
    res.send(result.image.image.data);
}


module.exports = {
    addGame,
    allGames,
    gameImage
}