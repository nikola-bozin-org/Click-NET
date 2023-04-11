const jwt = require("../jwt");
const statusCode = require("../statusCodes");
const {userRoles} = require('../helpers/enums')
const service = require('../services/paymentsService')


const payment = async(req,res) =>{
  const token = req.headers.token;
  if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
  const verifyResult = jwt.verify(token);
  if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token" });
  if(!(verifyResult.role===userRoles.Admin) && !(verifyResult.role===userRoles.Employee)) return res.status(statusCode.ERROR).json({error:`User ${verifyResult.username} is not Admin or Employee.`});
  const { username, payment } = req.body;
  const paymentInt = parseInt(payment);
  const result = await service._payment(username,paymentInt);
  if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error: `Server error: ${result.error}`})
  return res.status(statusCode.OK).json({ paymentProcessed: result.paymentProcessed,tableData:result.tableData})
}
const refund = async(req,res)=>{
  const token = req.headers.token;
  if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
  const verifyResult = jwt.verify(token);
  if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token" });
  if(!(verifyResult.role===userRoles.Admin) && !(verifyResult.role===userRoles.Employee)) return res.status(statusCode.ERROR).json({error:`User ${verifyResult.username} is not Admin or Employee`});
  const { username, refund } = req.body;
  const refundInt = parseInt(refund);
  const result = await service._refund(username,refundInt,verifyResult.username);
  if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error: `Server error: ${result.error}`})
  return res.status(statusCode.OK).json({ refundProcessed: result.refundProcessed})
}
const buyTicket = async (req, res) => {
  const token = req.headers.token;
  if(!token) return res.status(statuscode.ERROR).json({error:"Unauthorized."});
  const verifyResult = jwt.verify(token);
  if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token." });
  const username = verifyResult.username;
  const { name } = req.body;
  const result = await service._buyTicket(username,name);
  if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error: `Server error: ${result.error}`})
  return res.status(statusCode.OK).json({ message: result.message})
};


module.exports = {
  buyTicket,
  payment,
  refund,
};
