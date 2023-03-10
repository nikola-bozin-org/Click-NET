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


module.exports={
    createTicket,
    deleteTicket,
    getTickets,
}