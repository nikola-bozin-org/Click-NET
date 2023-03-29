const {User,CurrentCashRegisterSession,CashRegisterSessions,LogedInUsers} = require('../schemas')
const statusCode = require('../statusCodes')
const jwt = require('../jwt')
const {userRoles} = require('../helpers/enums');
const service = require('../services/cashRegisterService')

const openCashRegisterSession = async(req,res)=>{
    const {opener,password} = req.body;
    const result = await service._openCashRegisterSession(opener,password);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.status(statusCode.OK).json({message:result.message});
}
const closeCashRegisterSession = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."})
    const result = await service._closeCashRegisterSession(verifyResult);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.status(statusCode.OK).json({sessionClosed:result.sessionClosed});
}
const getCurrentSession = async (req,res)=>{
  const token = req.headers.token;
  if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
  const verifyResult = jwt.verify(token);
  if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
  if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
  try{
    const session = await CurrentCashRegisterSession.findOne({});
    return res.status(statusCode.OK).json({currentSession:session});
  }catch(e){
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`})
  }
}
const getSessions = async(req,res)=>{
  const token = req.headers.token;
  if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
  const verifyResult = jwt.verify(token);
  if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
  if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
  try{
    const sessions = await CashRegisterSessions.find({},{},{sort:{'createdAt':-1}});
    return res.status(statusCode.OK).json({sessions:sessions})
  }catch(e){
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`})
  }
}
const getPaymentsFromTo = async (req, res) => {
  const token = req.headers.token;
  if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
  const verifyResult = jwt.verify(token);
  if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
  if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const { startDate, endDate } = req.body;
    const result = await service._getPaymentsFromTo(startDate,endDate);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
    return res.status(statusCode.OK).json({payments:result.payments});
}
const calculateTrafficFromTo = async(req,res)=>{
  const token = req.headers.token;
  if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
  const verifyResult = jwt.verify(token);
  if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
  if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const { startDate, endDate } = req.body;
    const result = await service._calculateTrafficFromTo(startDate,endDate);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
      return res.status(statusCode.OK).json({totalTraffic:result.totalTrafficFromTo});
}
const getSessionsOnDay = async(req,res)=>{
  const token = req.headers.token;
  if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
  const verifyResult = jwt.verify(token);
  if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
  if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
  const {date} = req.body;
  const result = await service._getSessionsOnDay(date);
  if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
  return res.status(statusCode.OK).json({sessions:result.sessions});
}
const calculateTrafficOnDay=async(req,res)=>{
  const token = req.headers.token;
  if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
  const verifyResult = jwt.verify(token);
  if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
  if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
  const {date} = req.body;
  const  result = await service._calculateTrafficOnDay(date);
  if(result.error)
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
  return res.status(statusCode.OK).json({trafficOnDay:result.trafficOnDay});
}


module.exports = {
    openCashRegisterSession,
    getCurrentSession,
    closeCashRegisterSession,
    getSessions,
    getPaymentsFromTo,
    calculateTrafficFromTo,
    getSessionsOnDay,
    calculateTrafficOnDay,
}