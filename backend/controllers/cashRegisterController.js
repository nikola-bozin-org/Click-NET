const {User,CurrentCashRegisterSession,CashRegisterSessions} = require('../schemas')
const statusCode = require('../statusCodes')
const bcrypt = require('bcrypt')
const jwt = require('../jwt')

const openCashRegisterSession = async(req,res)=>{
    const {opener,password} = req.body;
    const username=opener;
    const user = await User.findOne({username});
    if(!user) return res.status(statusCode.ERROR).json({error:`User ${username} does not exist`})
    if(!bcrypt.compareSync(password, user.password)) return res.status(statusCode.ERROR).json({ error: `Wrong password.` })
    if(user.role!=="Admin" && user.role!=="Employee") return res.status(statusCode.ERROR).json({error:`User ${username} is not Admin or Employee`});
    if(user.isLogedIn===false) return res.status(statusCode.ERROR).json({error:`You must be loged in to open the session.`})
    const openDate = Date.now();
    const currentCashRegisterSession = await CurrentCashRegisterSession.findOne({});
    if(currentCashRegisterSession) return res.status(statusCode.ERROR).json({error:`There is session already open. ID: ${currentCashRegisterSession.id}`})
    const crSession = await CurrentCashRegisterSession.create({
        opener:username,
        startedAt:openDate,
        closedAt:undefined,
        payments:[]})
    return res.status(statusCode.OK).json({message:`Created new session. At ${openDate} by: ${opener}`, crSession:crSession});
}
const closeCashRegisterSession = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"})
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token"})
    const username = verifyResult.username;
    const user = await User.findOne({username})
    if(user.role!=="Admin" && user.role!=="Employee") return res.status(statusCode.ERROR).json({error:`User ${user} is not Admin or Employee`});
    const currentCashRegisterSession = await CurrentCashRegisterSession.findOne({});
    if(!currentCashRegisterSession) return res.status(statusCode.ERROR).json({error:"No cash register sessions."})

    const oldSession = await CashRegisterSessions.create({
        opener:currentCashRegisterSession.opener,
        startedAt:currentCashRegisterSession.startedAt,
        closedAt:Date.now(),
        payments:currentCashRegisterSession.payments
    })
    const result = await CurrentCashRegisterSession.findOneAndDelete({});
    res.status(statusCode.OK).json({sessionClosed:true});
}
const getCurrentSession = async (req,res)=>{
    const session = await CurrentCashRegisterSession.findOne({});
    return res.status(statusCode.OK).json({currentSession:session});
}
const getSessions = async(req,res)=>{
    const sessions = await CashRegisterSessions.find({},{},{sort:{'createdAt':-1}});
    res.status(statusCode.OK).json({sessions:sessions})
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
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:err.message})
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
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:err.message})
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
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:err.message})
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
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:err.message})
  }
}
const createDummySessions = async(req,res)=>{
  const now = new Date();
  const start = new Date('2021-01-01T00:00:00Z');
  const range = now.getTime() - start.getTime();
  for (let i = 0; i < 10; i++) {
    const opener = `Opener ${i}`;
    const startedAt = new Date(start.getTime() + Math.random() * range);
    const closedAt = new Date(startedAt.getTime() + Math.random() * range);
    const payments = [];
    const numPayments = Math.floor(Math.random() * 4) + 2;
    for (let j = 0; j < numPayments; j++) {
      const username = `User ${j}`;
      const paymentAmount = Math.floor(Math.random() * 951) + 50;
      const paymentDate = new Date(startedAt.getTime() + Math.random() * (closedAt.getTime() - startedAt.getTime()));
      payments.push({ username, paymentAmount, paymentDate });
    }
    CashRegisterSessions.create({opener,startedAt,closedAt,payments})
  }
  res.status(statusCode.OK).json({message:"Sessions are being created."});
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
    createDummySessions,
}