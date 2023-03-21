const {PCZone} = require('../schemas')
const statusCode = require('../statusCodes')


const getPCZones = async(req,res)=>{
    try{
        zones = await PCZone.find({});
        return res.status(statusCode.OK).json({zones:zones});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}

const createPCZone = async (req,res)=>{
    const {pc,zone} = req.body;
    console.info("check if valid zone");
    try{
        const createResult = await PCZone.create({
            pcNumber:pc,zone:zone
        })
        return res.status(statusCode.OK).json({message:`Created: PC ${pc} at zone ${zone}`});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}

const removePCZone = async(req,res)=>{

}

const updatePCZone = async(req,res) =>{

}



module.exports = {
    getPCZones,
    createPCZone,
    removePCZone,
    updatePCZone
}