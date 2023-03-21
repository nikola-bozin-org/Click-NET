const {User} = require('../schemas')
const statusCode = require('../statusCodes')



const getUserBalance = async (req, res) => {
    const { id } = req.params;
    const username = id;
    try{
        const user = await User.findOne({ username });
        if (user === null) return res.status(statusCode.ERROR).json({ error: "User not found." });
        res.status(statusCode.OK).json({ balance: user.balance });
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const getUserDiscount = async (req, res) => {
    const { id } = req.params;
    const username = id;
    try{
        const user = await User.findOne({ username });
        if (user === null) return res.status(statusCode.ERROR).json({ error: "User not found." });
        res.status(statusCode.OK).json({ discount: user.discount });
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const getUserXp = async (req, res) => {
    const { id } = req.params;
    const username = id;
    try{
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: "User not found." });
        return;
    }
    res.status(statusCode.OK).json({ xp: user.xp });
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const getUserRole = async(req,res)=>{
    const { id } = req.params;
    const username = id;
    try{
    const user = await User.findOne({username});
    if(!user) return res.status(statusCode.ERROR).json({error:"User not found."});
    return res.status(statusCode.OK).json({role:user.role});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const getUserBasicInfo = async(req,res)=>{
    const { id } = req.params;
    const username = id;
    try{
    const user = await User.findOne({username});
    if(!user) return res.status(statusCode.ERROR).json({error:"User not found."});
    return res.status(statusCode.OK).json({basicInfo:user.basicInfo});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const getActions=async(req,res)=>{
    const { id } = req.params;
    const username = id;
    try{
    const user = await User.findOne({username});
    if(!user) return res.status(statusCode.ERROR).json({error:"User not found."});
    return res.status(statusCode.OK).json({actions:user.actions});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const getTickets=async(req,res)=>{
    const { id } = req.params;
    const username = id;
    try{
    const user = await User.findOne({username});
    if(!user) return res.status(statusCode.ERROR).json({error:"User not found."});
    return res.status(statusCode.OK).json({tickets:user.activeTickets});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const getUserPayments = async (req, res) => {
    const { id } = req.params;
    const username = id;
    try{
        const user = await User.findOne({ username });
        if (user === null) {
            res.status(statusCode.ERROR).json({ error: "User not found." });
            return;
        }
        res.status(statusCode.OK).json({ payments: user.payments });
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
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
}