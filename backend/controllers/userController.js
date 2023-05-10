const statusCode = require('../statusCodes')
const service = require('../services/userService')
const jwt = require('../jwt')


const getUserBalance = async (req, res) => {
    const { id } = req.params;
    const result = await service._getUserBalance(id);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({ balance: result.balance });
}
const getUserDiscount = async (req, res) => {
    const { id } = req.params;
    const result = await service._getUserDiscount(id);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({ discount: result.discount });
}
const getUserXp = async (req, res) => {
    const { id } = req.params;
    const result = await service._getUserXp(id);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({ xp: result.xp });
}

const getUserRole = async (req, res) => {
    const { id } = req.params;
    const result = await service._getUserRole(id);
    if (result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: `Server error: ${result.error}` });
    return res.status(statusCode.OK).json({ role: result.role });
};

const getUserBasicInfo = async (req, res) => {
    const { id } = req.params;
    const result = await service._getUserBasicInfo(id);
    if (result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: `Server error: ${result.error}` });
    return res.status(statusCode.OK).json({ basicInfo: result.basicInfo });
};

const getActions = async (req, res) => {
    const { id } = req.params;
    const result = await service._getUserActions(id);
    if (result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: `Server error: ${result.error}` });
    return res.status(statusCode.OK).json({ actions: result.actions });
};
const getTickets = async (req, res) => {
    const { id } = req.params;
    const result = await service._getUserTickets(id);
    if (result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: `Server error: ${result.error}` });
    return res.status(statusCode.OK).json({ tickets: result.tickets });
};
const getUserPayments = async (req, res) => {
    const { id } = req.params;
    const result = await service._getUserPayments(id);
    if (result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error:`Server error: ${result.error}` });
    return res.status(statusCode.OK).json({ payments: result.payments });
};
const addToFavorites = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:'Unauthorized'});
    const verifyResult = jwt.verify(req.headers.token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:'Invalid Token.'});
    const username = verifyResult.username;
    const { gameName } = req.body;
    const result = await service._addToFavorites(username,gameName);
    if (result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error:`Server error: ${result.error}` });
    return res.status(statusCode.OK).json({ message: result.message });
}
const setUserBalance = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:'Unauthorized!'});
    const verifyResult = jwt.verify(req.headers.token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:'Invalid Token.'});
    const wsServerSecret = req.headers.secret;
    if(wsServerSecret!==process.env.VERIFY_SECRET_PASSWORD) return  res.status(statusCode.ERROR).json({error:'Unauthorized access!'});
    const username = verifyResult.username;
    const {balance}=req.body;
    const result = await service._setUserBalance(username,balance);
    if (result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ balanceUpdated:result.balanceUpdated ,error:`Server error: ${result.error}` });
    return res.status(statusCode.OK).json({ balanceUpdated:result.balanceUpdated });
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
    addToFavorites,
    setUserBalance,
}