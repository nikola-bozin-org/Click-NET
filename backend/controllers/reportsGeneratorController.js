const service = require('../services/reportsGenerator')
const statusCode = require('../statusCodes')
const jwt = require('../jwt')
const {userRoles} = require('../helpers/enums');

const generateZReport = async(req,res) =>{
    // const token = req.headers.token;
    // if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
    // const verifyResult = jwt.verify(token);
    // if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    // if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {startDate,endDate} = req.query;
    const result = await service._generateZReport(startDate,endDate);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.sendFile(result.filePath);
}


module.exports = {
    generateZReport
}