const {Tickets} = require('../schemas')
const statusCode = require('../statusCodes')
const jwt = require('../jwt')
const {userRoles, zones} =  require('../helpers/enums')

const createTicket = async (req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {name,cost,balance,zone} = req.body;
    try{
    const ticket = await Tickets.findOne({name});
    if(ticket) return res.status(statusCode.ERROR).json({error:`Ticket ${name} already exist.`})
    const result = await Tickets.create({name,cost,balance,zone});
    res.status(statusCode.OK).json({message:`Ticket ${name} created.`});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const deleteTicket = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {name}=req.body;
    try{
    const ticket = await Tickets.findOne({name});
    if(!ticket) return res.status(statusCode.ERROR).json({error:`Ticket ${name} does not exist.`})
    const result = await Tickets.deleteOne({name});
    res.status(statusCode.OK).json({message:`Deleted ${name} ticket.`})
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const getTickets = async(req,res)=>{
    try{
        const tickets = await Tickets.find({});
        return res.status(statusCode.OK).json({tickets:tickets});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const updateTicketCost = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {name,cost} = req.body;
    try{
    const ticket = await Tickets.findOne({name});
    if(!ticket) return res.status(statusCode.ERROR).json({error:"Invalid ticket name."});
    ticket.cost=cost;
    const result = await Tickets.updateOne({name},ticket);
    return res.status(statusCode.OK).json({message:`Ticket ${name} cost updated.`});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const updateTicketBalance = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {name,balance} = req.body;
    try{
    const ticket = await Tickets.findOne({name});
    if(!ticket) return res.status(statusCode.ERROR).json({error:"Invalid ticket name."});
    ticket.balance=balance;
    const result = await Tickets.updateOne({name},ticket);
    return res.status(statusCode.OK).json({message:`Ticket ${name} cost updated.`});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}

const updateTicketZone = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized"});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin) return res.status(statusCode.ERROR).json({error:"You are not Admin!"});
    const {name,zone} = req.body;
    if(!isZoneValid(zone)) return res.status(statusCode.ERROR).json({error:`Invalid zone: ${zone}.`})
    try{
        const ticket = await Tickets.findOne({name});
        if(!ticket) return res.status(statusCode.ERROR).json({error:"Invalid ticket name."});
        ticket.zone=zone;
        const result = await Tickets.updateOne({name},ticket);
        return res.status(statusCode.OK).json({message:`Ticket ${name} zone updated.`});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}

const isZoneValid = (zone) =>{
    return Object.values(zones).includes(zone);
} 


module.exports={
    createTicket,
    deleteTicket,
    getTickets,
    updateTicketCost,
    updateTicketBalance,
    updateTicketZone,
}