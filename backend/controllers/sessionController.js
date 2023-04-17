require('dotenv').config()
const jwt = require('../jwt')
const statusCode = require('../statusCodes')
const {userRoles} = require('../helpers/enums')
const service = require('../services/sessionService')

const loginStaff = async(req,res)=>{
    const {username,password} = req.body;
    const result = await service._loginStaff(username,password);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({accessToken:result.accessToken})
}
const verifyToken = async(req,res)=>{
    if(req.headers.secret!==process.env.VERIFY_SECRET_PASSWORD) return res.status(statusCode.ERROR).json({error:"Unathorized"})
    const verifyResult = jwt.verify(req.headers.token);
    if(verifyResult) return res.status(statusCode.OK).json({isValid:true,verifyResult:verifyResult});
    return res.status(statusCode.ERROR).json({isValid:false});
}
const loginUser = async (req,res) => {
    const { username, password, pcNumber } = req.body;
    const result = await service._loginUser(username,password,pcNumber);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({accessToken:result.accessToken})
}
const logoutUser = async (req,res) => {
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."})
    const result = await service._logoutUser(verifyResult.username,verifyResult.pcNumber,verifyResult.lastSessionId);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({message:`User ${verifyResult.username} logged out.`})
}
const logoutAllUsers = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin && verifyResult.role!==userRoles.Employee) return res.status(statusCode.ERROR).json({error:"You are not Admin or Employee"});
    const result = await service._logoutAllUsers(verifyResult.username);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({message:result.message})
}
const getLoggedInUsers = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin && verifyResult.role!==userRoles.Employee) return res.status(statusCode.ERROR).json({error:"You are not Admin or Employee"});
    const result = await service._getLoggedInUsers();
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({logedInUsers:result.logedInUsers})
}

// const getLoggedInUsers = async(req,res)=>{
//     const users =await User.find({isLogedIn:true},{username:1,_id:0});
//     res.status(statusCode.OK).json({logedInUsers_Database:users});
// }

module.exports={
    loginUser,
    logoutUser,
    loginStaff,
    getLoggedInUsers,
    logoutAllUsers,
    verifyToken
}