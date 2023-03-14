const {User,CashRegister} = require('../schemas')
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
    
    const lastCRSession = await CashRegister.findOne({}, {}, { sort: { 'createdAt' : -1 } });

    const openDate = Date.now();
    if(!lastCRSession) {
        const firstCashRegisterSession = await CashRegister.create({
            isOpen:true,
            opener:username,
            startedAt:openDate,
            closedAt:undefined,
            payments:[]
        })
        return res.status(statusCode.OK).json({msg:firstCashRegisterSession});
    }
    if(lastCRSession.isOpen) return res.status(statusCode.ERROR).json({error:`Session is already open by: ${lastCRSession.opener}. Session ID: ${lastCRSession.id}`})
    const newSession = await CashRegister.create({
        isOpen:true,
        opener:username,
        startedAt:openDate,
        closedAt:undefined,
        payments:[]
    }) 
    return res.status(statusCode.OK).json({message:`Session opened. At ${openDate} by: ${opener}`,session:newSession})
}
const closeCashRegisterSession = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"})
    const user = jwt.verify(token);
    if(!user) return res.status(statusCode.ERROR).json({error:"Invalid token"})
    console.info(user);
    console.info("is empoye od admine");
    const lastCashRegisterSession = await CashRegister.findOne({}, {}, { sort: { 'createdAt' : -1 } });
    if(!lastCashRegisterSession) return res.status(statusCode.ERROR).json({error:"No cash register sessions."})
    if(!lastCashRegisterSession.isOpen) return res.status(statusCode.ERROR).json({error:"No open sessions."});
    const filter = { _id: lastCashRegisterSession._id };
    const result = await CashRegister.updateOne(filter,{isOpen:false});
    res.status(statusCode.OK).json({sessionClosed:true,result:result});
}
const getCashRegisterSessions = async (req,res)=>{
    const sessions = await CashRegister.find({},{},{sort:{'created_at':-1}})
    return res.status(statusCode.OK).json({sessions:sessions});
}

module.exports = {
    openCashRegisterSession,
    getCashRegisterSessions,
    closeCashRegisterSession
}