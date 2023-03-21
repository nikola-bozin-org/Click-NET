const {Zone} = require('../schemas')

const createZone = async (req,res)=>{
    const {pc,zone} = req.body;
    const createResult = await Zone.create({
        pcNumber:pc,zone:zone
    })
}

const removeZone = async(req,res)=>{

}

const updateZone = async(req,res) =>{

}



module.exports = {
    createZone,
    removeZone,
    updateZone
}