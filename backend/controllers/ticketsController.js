const {Tickets} = require('../schemas')
const statusCode = require('../statusCodes')


const createTicket = async (req,res)=>{
    console.info("ADMIN");
    const {name,cost,balance} = req.body;
    const ticket = await Tickets.findOne({name});
    if(ticket) return res.status(statusCode.ERROR).json({error:`Ticket ${name} already exist.`})
    const result = await Tickets.create({name,cost,balance});
    res.status(statusCode.OK).json({result:result});
}
const deleteTicket = async(req,res)=>{
    console.info("ADMIN");
    const {name}=req.body;
    const ticket = await Tickets.findOne({name});
    if(!ticket) return res.status(statusCode.ERROR).json({error:`Ticket ${name} does not exist.`})
    const result = await Tickets.deleteOne({name});
    res.status(statusCode.OK).json({message:`Deleted ${name} ticket.`,result:result})
}
const getTickets = async(req,res)=>{
    const tickets = await Tickets.find({});
    res.status(statusCode.OK).json({tickets:tickets});
}
const updateTicketCost = async(req,res)=>{
    console.info("ADMIN");
    const {name,cost} = req.body;
    const ticket = await Tickets.findOne({name});
    if(!ticket) return res.status(statusCode.ERROR).json({error:"Invalid ticket name."});
    ticket.cost=cost;
    const result = await Tickets.updateOne({name},ticket);
    return res.status(statusCode.OK).json({message:`Ticket ${name} cost updated.`,result:result});
}
const updateTicketBalance = async(req,res)=>{
    console.info("ADMIN");
    const {name,balance} = req.body;
    const ticket = await Tickets.findOne({name});
    if(!ticket) return res.status(statusCode.ERROR).json({error:"Invalid ticket name."});
    ticket.balance=balance;
    const result = await Tickets.updateOne({name},ticket);
    return res.status(statusCode.OK).json({message:`Ticket ${name} cost updated.`,result:result});


}


module.exports={
    createTicket,
    deleteTicket,
    getTickets,
    updateTicketCost,
    updateTicketBalance
}