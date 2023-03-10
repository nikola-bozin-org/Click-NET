const {Levels} = require('../schemas')
const statusCode = require('../statusCodes')

const addLevel = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
    console.info("Admin")
    const {level,xp}=req.body;
    const foundLevel = await Levels.findOne({level});
    if(foundLevel) return res.status(statusCode.ERROR).json({error:"Level already created."})
    try{
        const result = await Levels.create({xp:xp,level:level});
        return res.status(statusCode.OK).json({result:result});
    }catch(e){
        return res.status(statusCode.ERROR).json({error:e})
    }
}
const updateLevelXP = async (req, res) => {
    const token = req.headers.token;
    if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unauthorized." });
    console.info("Admin");
    const { level, xp } = req.body;
    const foundLevel = await Levels.findOne({level});
    if(!foundLevel) return res.status(statusCode.ERROR).json({error:`Level ${level} does not exist.`})
    foundLevel.xp=xp;
    const result = await Levels.updateOne({level},foundLevel);
    return res.status(statusCode.OK).json({result:result});
};
const deleteLevel = async(req,res)=>{
    const {level} = req.body;
    const foundLevel = await Levels.findOne({level});
    console.info(foundLevel);
    if(!foundLevel) return res.status(statusCode.ERROR).json({error:`Level ${level} does not exist.`});
    await Levels.deleteOne({level});
    return res.status(statusCode.OK).json({message:`Level ${level} deleted.`});
}
const getLevels = async(req,res)=>{
    const levels = await Levels.find({});
    res.status(statusCode.OK).json({levels:levels});
}
const getLevel =async(req,res)=>{
    const {level} = req.params;
    const foundLevel = await Levels.findOne({level});
    console.info(foundLevel)
    if(!foundLevel) return res.status(statusCode.OK).json({error:`Level ${level} does not exist.`});
    return res.status(statusCode.OK).json({level:foundLevel})
}

module.exports={
    addLevel,
    updateLevelXP,
    deleteLevel,
    getLevels,
    getLevel,
}