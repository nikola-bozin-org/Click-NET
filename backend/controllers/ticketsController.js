const statusCode = require('../statusCodes')
const jwt = require('../jwt')
const {userRoles} =  require('../helpers/enums')
const service = require('../services/ticketsService')

const createTicket = async (req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {name,cost,balance,zone,start,end} = req.body;
    const result = await service._createTicket(name,cost,balance,zone,start,end);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({message:result.message});
}
const deleteTicket = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {name}=req.body;
    const result = await service._deleteTicket(name);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({message:result.message})
}
const getTicket = async(req,res)=>{
    const { name } = req.params;
    const result = await service._getTicket(name);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({ticket:result.ticket})
}
const getTickets = async(req,res)=>{
    const result = await service._getTickets();
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({tickets:result.tickets})
}
const updateTicketCost = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {name,cost} = req.body;
    const result = await service._updateTicketCost(name,cost);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({message:result.message})
}
const updateTicketBalance = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {name,balance} = req.body;
    const result = await service._updateTicketBalance(name,balance);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({message:result.message})
}

const updateTicketZone = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {name,zone} = req.body;
    const result = await service._updateTicketZone(name,zone);
    if(result.error) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${result.error}`});
    return res.status(statusCode.OK).json({message:result.message})
}



module.exports={
    createTicket,
    deleteTicket,
    getTickets,
    getTicket,
    updateTicketCost,
    updateTicketBalance,
    updateTicketZone,
}