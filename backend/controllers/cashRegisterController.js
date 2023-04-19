const statusCode = require('../statusCodes')
const jwt = require('../jwt')
const {userRoles} = require('../helpers/enums');
const service = require('../services/cashRegisterService')

const openCashRegisterSession = async(req,res)=>{
  const token = req.headers.token;
  if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
  const verifyResult = jwt.verify(token);
  if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token" });
  if(!(verifyResult.role===userRoles.Admin) && !(verifyResult.role===userRoles.Employee)) return res.status(statusCode.ERROR).json({error:`User ${verifyResult.username} is not Admin or Employee.`});
  const {password} = req.body;
  const result = await service._openCashRegisterSession(verifyResult.username,password);
  if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
  return res.status(statusCode.OK).json({message:result.message});
}
const closeCashRegisterSession = async(req,res)=>{
  const token = req.headers.token;
  if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
  const verifyResult = jwt.verify(token);
  if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."})
  const {password} = req.body;
  const result = await service._closeCashRegisterSession(verifyResult,password);
  if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
  return res.status(statusCode.OK).json({sessionClosed:result.sessionClosed});
}
const getCurrentSession = async (req,res)=>{
  const token = req.headers.token;
  if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
  const verifyResult = jwt.verify(token);
  if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
  if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
  const result = await service._getCurrentSession();
  if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
  return res.status(statusCode.OK).json({currentSession:result.currentSession});
}
const getCurrentSessionPayments = async(req,res)=>{
  const token = req.headers.token;
  if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
  const verifyResult = jwt.verify(token);
  if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
  if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
  const result = await service._getCurrentSessionPayments();
  if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
  return res.status(statusCode.OK).json({currentSessionPayments:result.currentSessionPayments});
}
const getSessions = async(req,res)=>{
  const token = req.headers.token;
  if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
  const verifyResult = jwt.verify(token);
  if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
  if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
  const result = await service._getSessions();
  if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
  return res.status(statusCode.OK).json({currentSession:result.sessions});
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
  if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`})
  return res.status(statusCode.OK).json({trafficOnDay:result.trafficOnDay});
}


module.exports = {
    openCashRegisterSession,
    getCurrentSession,
    getCurrentSessionPayments,
    closeCashRegisterSession,
    getSessions,
    getPaymentsFromTo,
    calculateTrafficFromTo,
    getSessionsOnDay,
    calculateTrafficOnDay,
}