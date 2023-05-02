const statusCode = require('../statusCodes')
const jwt = require('../jwt')
const {userRoles}=require('../helpers/enums')
const service = require('../services/gamesService')

const addGame = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {name,category,isEnabled,installationPath,zone} = req.body;
    const result = await service._addGame(name,category,Boolean(isEnabled),installationPath,zone);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.status(statusCode.OK).json({message:result.message,game:result.game});
}
const allGames = async(req,res)=>{
    // const token = req.headers.token;
    // if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
    // const verifyResult = jwt.verify(token);
    // if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token" });
    // if(!(verifyResult.role===userRoles.Admin) && !(verifyResult.role===userRoles.Employee)) return res.status(statusCode.ERROR).json({error:`User ${verifyResult.username} is not Admin or Employee.`});
    const result = await service._allGames();
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.status(statusCode.OK).json({games:result.games});
}


module.exports = {
    addGame,
    allGames
}