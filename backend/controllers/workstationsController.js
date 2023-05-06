const statusCode = require('../statusCodes')
const {userRoles} = require('../helpers/enums');
const jwt = require('../jwt')
const service = require('../services/workstationsService');
const { checkLocalHostIP } = require('../helpers/validators');

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
    const ip = checkLocalHostIP(req.ip)
    const result = await service._wakeUp(ip);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({data:result.data})
}
const getWorkstations = async(req,res)=>{
    const token = req.headers.token;
    if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
    const verifyResult = jwt.verify(token);
    if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token" });
    if(!(verifyResult.role===userRoles.Admin) && !(verifyResult.role===userRoles.Employee)) return res.status(statusCode.ERROR).json({error:`User ${verifyResult.username} is not Admin or Employee`});
    const result = await service._getWorkStations();
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({workstations:result.workstations})
}


module.exports = {
    addWorkstation,
    wakeUp,
    getWorkstations
}