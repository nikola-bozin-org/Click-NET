const { User,CurrentCashRegisterSession, CashRegisterSessions,LogedInUsers } = require("../schemas")
const {userRoles} = require('../helpers/enums')
const bcrypt = require('bcrypt')


const  _getPaymentsFromTo = async(startDate,endDate)=>{
    try{
        const sessions = await CashRegisterSessions.find(
            {
              openedAt: {
                $gte: startDate,
                $lte: endDate,
              },
            },
            { payments: 1, _id: 0 }
          );
          const payments = sessions.flatMap((session) => session.payments);
          return {payments:payments};
    }catch(e){
        return {error:e.message}
    }
}
const _calculateTrafficFromTo = async(startDate,endDate)=>{
    try {
        const sessions = await CashRegisterSessions.find(
          {
            openedAt: {
              $gte: startDate,
              $lte: endDate,
            },
          },
          { payments: 1, _id: 0 }
        );
        const payments = sessions.flatMap((session) => session.payments);
        const totalPaymentAmount = payments.reduce((acc, cur) => acc + cur.paymentAmount, 0);
        return {totalTrafficFromTo:totalPaymentAmount}
    }catch(e){
        return {error:e.message}
    }
}
const _getSessionsOnDay = async(date)=>{
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate()+1);
    try{
        const sessions = await CashRegisterSessions.find(
          {
            openedAt: {
              $gte: date,
              $lte: endDate,
            },
          },
          { payments: 1, _id: 0 }
        );
        return {sessions:sessions}
    }catch(e){
        return {error:e.message};
    }
}
const _calculateTrafficOnDay=async(date)=>{
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate()+1);
    try{
        const sessions = await CashRegisterSessions.find(
          {
            openedAt: {
              $gte: date,
              $lte: endDate,
            },
          },
          { payments: 1, _id: 0 }
        );
        const payments = sessions.flatMap((session) => session.payments);
        const totalPaymentAmount = payments.reduce((acc, cur) => acc + cur.paymentAmount, 0);
        return {trafficOnDay:totalPaymentAmount}
    }catch(e){
        return {error:e.message}
    }
}
const _getCurrentSession = async()=>{
  try{
    const session = await CurrentCashRegisterSession.findOne({}).populate('payments');
    return {currentSession:session}
  }catch(e){
    return {error:e.message}
  }
}
const _getCurrentSessionPayments = async(amountToReturn,page)=>{
  try{
    const limit = parseInt(amountToReturn, 10);
    const skip = (parseInt(page, 10)) * limit;
    const session = await CurrentCashRegisterSession.findOne({}).populate({path:'payments',select:'-__v -_id'}).limit(limit).skip(skip);
    return {currentSessionPayments:session.payments}
  }catch(e){
    return {error:e.message}
  }
}
const _getSessions = async()=>{
  try{
    const sessions = await CashRegisterSessions.find({},{},{sort:{'createdAt':-1}});
    return {sessions:sessions}
  }catch(e){
    return {error:e.message}
  }
}
const _closeCashRegisterSession = async(user,password)=>{
    try{
        const username=user.username;
        const userAbsolute = await User.findOne({username});
        const isLogedIn = await LogedInUsers.findOne({username})
        if(!isLogedIn) return {error:`${username} is not loged in.`}
        if(user.role!==userRoles.Admin && user.role!==userRoles.Employee) return {error:`User ${user.username} is not Admin or Employee`};
        const currentCashRegisterSession = await CurrentCashRegisterSession.findOne({}).populate('payments');
        if(!currentCashRegisterSession) return {error:"No cash register sessions."};
        if (!bcrypt.compareSync(password, userAbsolute.password)) return { error: `Wrong password.` }
        const totalAmount = currentCashRegisterSession.payments.reduce((acc,cur)=> acc + cur.paymentAmount, 0);
        await CashRegisterSessions.create({
            opener:currentCashRegisterSession.opener,
            openedAt:currentCashRegisterSession.openedAt,
            closedAt:Date.now(),
            payments:currentCashRegisterSession.payments,
            number:currentCashRegisterSession.number,
            amount:totalAmount,
        })
        await CurrentCashRegisterSession.findOneAndDelete({});
        return {sessionClosed:true}
    }catch(e){
        return {error:e.message}
    }  
}
const _openCashRegisterSession = async(opener,password)=>{
    try{
        const openDate = Date.now();
        const user = await User.findOne({username: opener});
        if(!user) return {error:`User ${opener} does not exist`}
        if(!bcrypt.compareSync(password, user.password)) return { error: `Wrong password.` }
        if(user.role!==userRoles.Admin && user.role!==userRoles.Employee) return {error:`User ${opener} is not Admin or Employee`};
        const isLogedIn = await LogedInUsers.findOne({username:opener});
        if(!isLogedIn) return {error:`You must be loged in to open the session.`}
        const currentCashRegisterSession = await CurrentCashRegisterSession.findOne({});
        if(currentCashRegisterSession) return {error:`There is session already open. ID: ${currentCashRegisterSession.id}`}
        const numberOfDocuments = await CurrentCashRegisterSession.countDocuments({});
        await CurrentCashRegisterSession.create({
            number:numberOfDocuments,
            opener:opener,
            openedAt:openDate,
            payments:[],
            amount:0
        })
        const sessionCreated = await CurrentCashRegisterSession.findOne({});
        return {currentSession:sessionCreated}
    }catch(e){
        return {error:e.message}
    }
}

module.exports ={
    _getPaymentsFromTo,
    _calculateTrafficFromTo,
    _getSessionsOnDay,
    _calculateTrafficOnDay,
    _closeCashRegisterSession,
    _openCashRegisterSession,
    _getCurrentSession,
    _getSessions,
    _getCurrentSessionPayments
}