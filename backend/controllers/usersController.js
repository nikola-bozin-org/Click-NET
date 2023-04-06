const statusCode = require('../statusCodes')
const jwt = require('../jwt')
const {userRoles} = require('../helpers/enums')
const service = require('../services/usersService')

const getUsers = async (req, res) => {
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:'Unathorized'});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid Token."});
    if(verifyResult.role!==userRoles.Admin && verifyResult.role!==userRoles.Employee) return res.status(statusCode.ERROR).json({error:"Not Admin or Employee."});
    const result = await service._getUsers();
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({ users: result.users });
}
const getUser = async (req, res) => {
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:'Unathorized'});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid Token."});
    if(verifyResult.role!==userRoles.Admin && verifyResult.role!==userRoles.Employee) return res.status(statusCode.ERROR).json({error:"Not Admin or Employee."});
    const { id } = req.params;
    const result = await service._getUser(id);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({ user: result.user });
}
const createUser = async (req, res) => {
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:'Unauthorized'});
    const verifyResult = jwt.verify(req.headers.token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:'Invalid Token.'});
    if(verifyResult.role!==userRoles.Admin && verifyResult.role!==userRoles.Employee) return res.status(statusCode.ERROR).json({error:'you are not Admin or Employee.'});
    const { username, password, firstName, lastName, email, phone } = req.body;
    const result = await service._createUser(verifyResult.username,username,password,firstName,lastName,email,phone);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({ userCreated: result.userCreated});
}
const changePassword = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:'Unauthorized.'})
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:'Invalid token.'});
    const {oldPassword,newPassword} = req.body; 
    const result = await service._changePassword(verifyResult.username,oldPassword,newPassword,verifyResult.pcNumber);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({message:result.message,accessToken:result.accessToken});
}
module.exports = {
    getUsers,
    getUser,
    createUser,
    changePassword,
}