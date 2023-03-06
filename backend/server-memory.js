const logedInUsers = [];

const levels=[
    { level:1,xp:2000 },
    { level:2,xp:2000 },
    { level:3,xp:2000 },
    { level:4,xp:2000 },
    { level:5,xp:2000 },
    { level:6,xp:5000 },
    { level:7,xp:5000 },
    { level:8,xp:5000 },
    { level:9,xp:5000 },
    { level:10,xp:5000 },
    { level:11,xp:5000 },
    { level:12,xp:5000 },
    { level:13,xp:5000 },
    { level:14,xp:5000 },
    { level:15,xp:5000 },
    { level:16,xp:5000 },
    { level:17,xp:5000 },
    { level:18,xp:5000 },
    { level:19,xp:5000 },
    { level:20,xp:10000 },
    { level:21,xp:10000 },
    { level:22,xp:10000 },
    { level:23,xp:10000 },
    { level:24,xp:10000 },
    { level:25,xp:10000 },
]

const modifyLevelXp = (level,newXp)=>{
    const levleObj = levels.find(obj=>obj.level===level);
    if(levleObj){
        levleObj.xp=newXp;
    }
}
const getLevelXp = (level) =>{
    const levleObj = levels.find(obj=>obj.level===level);
    if(levleObj){
        return levleObj.xp;
    }
    return undefined;
}

module.exports={
    logedInUsers,
    levels,
    modifyLevelXp,
    getLevelXp,
}