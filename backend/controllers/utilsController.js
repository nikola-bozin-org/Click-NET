const statusCode = require('../statusCodes')
const jwt = require('../jwt')
const {userRoles} = require('../helpers/enums');


const getPCLimit = async(req,res)=>{
    return res.status(statusCode.OK).json({message:"OK getPCLimit"})
}

const setPCLimit = async(req,res)=>{
    return res.status(statusCode.OK).json({message:"OK setPCLimit"})
}


module.exports={
    getPCLimit,
    setPCLimit
}