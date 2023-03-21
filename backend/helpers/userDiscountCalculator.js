const {service_getLevelsSortedByLevel} = require("../controllers/levelsController")


const calculateDiscount = async(userXP)=>{
    const levels = await service_getLevelsSortedByLevel();
    if(!levels) throw Error("Unable to calculate discount. Levels returned are NULL.");
    const length = levels.length;
    let discout = 0;
    let userXPcopy = userXP;
    for(let i=0;i<length;i++){
        userXPcopy-=levels[i].xp;
        if(userXPcopy===0){discout++; return discout;}
        if(userXPcopy<0) return discout;
        discout++;
    }
    return discout;
}


module.exports = calculateDiscount;