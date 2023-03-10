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


module.exports={
    addLevel,
    updateLevelXP
}