const jwt = require('../jwt')
const {usersRoles, userRoles} = require('../helpers/enums');
const statusCode = require('../statusCodes');


const checkIfViewer = async(req,res,next) =>{
    const allowedMethods = ['GET'];
    if(allowedMethods.includes(req.method)) return next();
    if(req.body.username==='viewer' || req.body.username==='admin') return next();
    const token = req.headers.token;
    if(!token) return res.status(statusCode.ERROR).json({error:"Unauthorized!"})
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid Token!"})
    if(verifyResult.role===userRoles.Viewer) return res.status(statusCode.ERROR).json({error:"Access not allowed!"})
    next();
}

module.exports=checkIfViewer;