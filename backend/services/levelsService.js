const {Levels} = require('../schemas')
const {userRoles}=require('../helpers/enums')



const _addLevel = async (level,xp)=>{
    try{
        const foundLevel = await Levels.findOne({level});
        if(foundLevel) return {error:`Level ${level} already created.`}
        const resultCreate = await Levels.create({xp:xp,level:level});
        return {message:`Level created.`};
    }catch(e){
        return {error:e.message}
    }
}

const _updateLevelXP = async(level,xp)=>{
    try{
        const foundLevel = await Levels.findOne({level});
        if(!foundLevel) return {error:`Level ${level} does not exist.`}
        foundLevel.xp=xp;
        const result = await Levels.updateOne({level},foundLevel);
        return {message:`Level ${level} XP updated.`};
    }catch(e){
        return {error:e.message}
    }
}

const _deleteLevel = async(level)=>{
    try{
        const foundLevel = await Levels.findOne({level});
        if(!foundLevel) return {error:`Level ${level} does not exist.`};
        await Levels.deleteOne({level});
        return {message:`Level ${level} deleted.`};
    }catch(e){
        return {error:e.message}
    }
}
const _getLevels = async()=>{
    try{
        const levels = await Levels.find({});
        return {levels:levels};
    }catch(e){
        return {error:e.message}
    }
}
const _getLevelsSortedByLevels = async()=>{
    try{
        const levels = await Levels.find({},{},{sort:{level:1}})
        return {levels:levels}
    }catch(e){
        return {error:e.message}
    }
}

const _getLevel = async(level)=>{
    try{
        const foundLevel = await Levels.findOne({level});
        if(!foundLevel) return {error:`Level ${level} does not exist.`};
        return {level:foundLevel}
    }catch(e){
        return {error:e.message}
    }
}

module.exports={
    _addLevel,
    _updateLevelXP,
    _deleteLevel,
    _getLevels,
    _getLevelsSortedByLevels,
    _getLevel
}