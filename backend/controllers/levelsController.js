const statusCode = require('../statusCodes')
const jwt = require('../jwt')
const {userRoles}=require('../helpers/enums')
const service = require('../services/levelsService')

const addLevel = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {level,xp}=req.body;
    const result = await service._addLevel(level,xp);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.status(statusCode.OK).json({message:result.message});
}
const updateLevelXP = async (req, res) => {
    const token = req.headers.token;
    if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unauthorized." });
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const { level, xp } = req.body;
    const result = await service._updateLevelXP(level,xp);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.status(statusCode.OK).json({message:result.message});
};
const deleteLevel = async(req,res)=>{
    const token = req.headers.token;
    if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unauthorized." });
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {level} = req.body;
    const result = await service._deleteLevel(level);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.status(statusCode.OK).json({message:result.message});

}
const getLevels = async(req,res)=>{
    const result = await service._getLevels();
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.status(statusCode.OK).json({levels:result.levels});
}

const getLevelsSortedByLevel = async(req,res)=>{
    const result = await service._getLevelsSortedByLevels();
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.status(statusCode.OK).json({levels:result.levels});
}

const getLevel =async(req,res)=>{
    const {level} = req.params;
    const result = await service._getLevel(level);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.status(statusCode.OK).json({levels:result.level});
}

module.exports={
    addLevel,
    updateLevelXP,
    deleteLevel,
    getLevels,
    getLevel,
    // createDefaultLevels,
    getLevelsSortedByLevel,
}