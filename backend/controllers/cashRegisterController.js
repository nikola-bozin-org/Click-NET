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

module.exports = {
    openCashRegisterSession,
    getCurrentSession,
    closeCashRegisterSession,
    getSessions,
}