const {User,CurrentCashRegisterSession,CashRegisterSessions,LogedInUsers} = require('../schemas')
const statusCode = require('../statusCodes')
const bcrypt = require('bcrypt')
const jwt = require('../jwt')
const {userRoles} = require('../helpers/enums');

const openCashRegisterSession = async(req,res)=>{
    const {opener,password} = req.body;
    try{
      const user = await User.findOne({username: opener});
      if(!user) return res.status(statusCode.ERROR).json({error:`User ${opener} does not exist`})
      if(!bcrypt.compareSync(password, user.password)) return res.status(statusCode.ERROR).json({ error: `Wrong password.` })
      if(user.role!==userRoles.Admin && user.role!==userRoles.Employee) return res.status(statusCode.ERROR).json({error:`User ${opener} is not Admin or Employee`});
      const isLogedIn = await LogedInUsers.findOne({username:opener});
      if(!isLogedIn) return res.status(statusCode.ERROR).json({error:`You must be loged in to open the session.`})
      const openDate = Date.now();
      const currentCashRegisterSession = await CurrentCashRegisterSession.findOne({});
      if(currentCashRegisterSession) return res.status(statusCode.ERROR).json({error:`There is session already open. ID: ${currentCashRegisterSession.id}`})
      const numberOfDocuments = await CurrentCashRegisterSession.countDocuments({});
      const crSession = await CurrentCashRegisterSession.create({
          number:numberOfDocuments,
          opener:opener,
          startedAt:openDate,
          closedAt:undefined,
          payments:[],
          amount:0
      })
      return res.status(statusCode.OK).json({message:`Created new session. At ${openDate} by: ${opener}`, crSession:crSession});
  }catch(e){
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`})
  }
}
const closeCashRegisterSession = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."})
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."})
    const username = verifyResult.username;
    try{
      const user = await User.findOne({username})
      if(user.role!==userRoles.Admin && user.role!==userRoles.Employee) return res.status(statusCode.ERROR).json({error:`User ${user.username} is not Admin or Employee`});
      const currentCashRegisterSession = await CurrentCashRegisterSession.findOne({});
      if(!currentCashRegisterSession) return res.status(statusCode.ERROR).json({error:"No cash register sessions."})

      const oldSession = await CashRegisterSessions.create({
          opener:currentCashRegisterSession.opener,
          startedAt:currentCashRegisterSession.startedAt,
          closedAt:Date.now(),
          payments:currentCashRegisterSession.payments,
          number:currentCashRegisterSession.number,
          amount:currentCashRegisterSession.payments.reduce((acc,cur)=> acc + cur.paymentAmount, 0),
      })
      const result = await CurrentCashRegisterSession.findOneAndDelete({});
      res.status(statusCode.OK).json({sessionClosed:true});
  }catch(e){
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`})
  }
}
const getCurrentSession = async (req,res)=>{
  try{
    const session = await CurrentCashRegisterSession.findOne({});
    return res.status(statusCode.OK).json({currentSession:session});
  }catch(e){
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`})
  }
}
const getSessions = async(req,res)=>{
  try{
    const sessions = await CashRegisterSessions.find({},{},{sort:{'createdAt':-1}});
    return res.status(statusCode.OK).json({sessions:sessions})
  }catch(e){
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`})
  }
}
const getPaymentsFromTo = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
      const sessions = await CashRegisterSessions.find(
        {
          startedAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        { payments: 1, _id: 0 }
      );
      const payments = sessions.flatMap((session) => session.payments);
      return res.status(statusCode.OK).json({payments:payments});
    } catch (err) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`})
    }
};
const calculateTraffic = async(req,res)=>{
    const { startDate, endDate } = req.query;
    try {
      const sessions = await CashRegisterSessions.find(
        {
          startedAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        { payments: 1, _id: 0 }
      );
      const payments = sessions.flatMap((session) => session.payments);
      const totalPaymentAmount = payments.reduce((acc, cur) => acc + cur.paymentAmount, 0);
      return res.status(statusCode.OK).json({totalTraffic:totalPaymentAmount});
    } catch (err) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`})
    }
}
const getSessionsOnDay = async(req,res)=>{
  const {date} = req.query;
  const endDate = new Date(date); 
  endDate.setDate(endDate.getDate() + 1);
  console.info(date);
  console.info(endDate.toLocaleDateString());
  try{
    const sessions = await CashRegisterSessions.find(
      {
        startedAt: {
          $gte: date,
          $lte: endDate,
        },
      },
      { payments: 1, _id: 0 }
    );
    return res.status(statusCode.OK).json({sessions:sessions});
  }catch(e){
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`})
  }
}
const calculateTrafficOnDay=async(req,res)=>{
  const {date} = req.query;
  const endDate = new Date("2023-03-15"); 
  try{
    const sessions = await CashRegisterSessions.find(
      {
        startedAt: {
          $gte: date,
          $lte: endDate,
        },
      },
      { payments: 1, _id: 0 }
    );
    const payments = sessions.flatMap((session) => session.payments);
    const totalPaymentAmount = payments.reduce((acc, cur) => acc + cur.paymentAmount, 0);
    return res.status(statusCode.OK).json({totalPayment:totalPaymentAmount});
  }catch(e){
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`})
  }
}


module.exports = {
    openCashRegisterSession,
    getCurrentSession,
    closeCashRegisterSession,
    getSessions,
    getPaymentsFromTo,
    calculateTraffic,
    getSessionsOnDay,
    calculateTrafficOnDay,
}