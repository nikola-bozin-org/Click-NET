const {User} = require('../schemas')
const statusCode = require('../statusCodes')


const getUserBalance = async (req, res) => {
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: "User not found." });
        return;
    }
    res.status(statusCode.OK).json({ balance: user.balance });
}
const getUserDiscount = async (req, res) => {
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: "User not found." });
        return;
    }
    res.status(statusCode.OK).json({ discount: user.discount });
}
const getUserXp = async (req, res) => {
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: "User not found." });
        return;
    }
    res.status(statusCode.OK).json({ xp: user.xp });
}
const getUserRole = async(req,res)=>{
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({username});
    if(!user) return res.status(statusCode.ERROR).json({error:"User not found."});
    return res.status(statusCode.OK).json({role:user.role});
}
const getUserBasicInfo = async(req,res)=>{
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({username});
    if(!user) return res.status(statusCode.ERROR).json({error:"User not found."});
    return res.status(statusCode.OK).json({basicInfo:user.basicInfo});
}
const getActions=async(req,res)=>{
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({username});
    if(!user) return res.status(statusCode.ERROR).json({error:"User not found."});
    return res.status(statusCode.OK).json({actions:user.actions});
}
const getTickets=async(req,res)=>{
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({username});
    if(!user) return res.status(statusCode.ERROR).json({error:"User not found."});
    return res.status(statusCode.OK).json({tickets:user.activeTickets});
}
const getUserPayments = async (req, res) => {
    return res.send("This needs change. Mozda uzer treba da ima svoje peymente... zavisi kolko se tesko izvlaci iz baze.. jer ja to mogu davidim");
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: "User not found." });
        return;
    }
    res.status(statusCode.OK).json({ payments: user.payments });
}
const getUserSessions = async (req, res) => {
    return res.status("This needs change.")
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: "User not found." });
        return;
    }
    res.status(statusCode.OK).json({ sessions: user.sessions });
}


module.exports = {
    getUserBalance,
    getUserDiscount,
    getUserXp,
    getUserRole,
    getUserBasicInfo,
    getActions,
    getTickets,

    getUserPayments,
    getUserSessions,
}