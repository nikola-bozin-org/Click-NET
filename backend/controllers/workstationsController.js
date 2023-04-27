const statusCode = require('../statusCodes')
const {userRoles} = require('../helpers/enums');
const jwt = require('../jwt')
const service = require('../services/workstationsService')


const addWorkstation = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {number,IP,MAC,zone,x,y} = req.body;
    const result = await service._addWorkstation(number,IP,MAC,zone,x,y);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({message:result.message})
}

const wakeUp = async(req,res)=>{
    let ip = req.ip;
    if(ip==='::1') ip = '192.168.0.10';
    const result = await service._wakeUp(-1);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({data:result.data})
}


module.exports = {
    addWorkstation,
    wakeUp
}