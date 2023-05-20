const { Tickets } = require("../schemas");
const {zones} = require('../helpers/enums')

const _createTicket = async (name, cost, balance, zone, start, end) => {
  try {
    await Tickets.create({ name, cost, balance, zone,availability:{start:start,end:end} });
    return { message: `Ticket ${name} created.` };
  } catch (e) {
    return { error: e.message };
  }
};

const _deleteTicket = async (name) => {
  try {
    const ticket = await Tickets.findOne({ name });
    if (!ticket) return { error: `Ticket ${name} does not exist.` };
    await Tickets.deleteOne({ name });
    return { message: `Deleted ${name} ticket.` };
  } catch (e) {
    return { error: e.message };
  }
};

const _getTickets = async()=>{
    try{
        const tickets = await Tickets.find({});
        return {tickets:tickets};
    }catch(e){
        return {error:e.message}
    }
}

const _getTicket = async(name)=>{
    try{
        const ticket = await Tickets.findOne({name})
        return {ticket:ticket}
    }catch(e){
        return {error:e.message}
    }
}
const _updateTicketCost = async (name, cost) => {
  try {
    const ticket = await Tickets.findOne({ name });
    if (!ticket) return { error: "Invalid ticket name." };
    ticket.cost = cost;
    await Tickets.updateOne({ name }, ticket);
    return { message: `Ticket ${name} cost updated.` };
  } catch (e) {
    return { error:e.message };
  }
};
const _updateTicketBalance = async(name,balance)=>{
    try{
        const ticket = await Tickets.findOne({name});
        if(!ticket) {error:"Invalid ticket name."};
        ticket.balance=balance;
        await Tickets.updateOne({name},ticket);
        return {message:`Ticket ${name} cost updated.`};
    }catch(e){
        return {error:e.message};
    }
}

const _updateTicketZone = async(name,zone)=>{
    if(!isZoneValid(zone)) return {error:`Invalid zone: ${zone}.`}
    try{
        const ticket = await Tickets.findOne({name});
        if(!ticket) return {error:"Invalid ticket name."};
        ticket.zone=zone;
        await Tickets.updateOne({name},ticket);
        return {message:`Ticket ${name} zone updated.`};
    }catch(e){
        return {error:e.message};
    }
}

const _getTicketsByZone = async(zone)=>{
  try{
    const tickets = await Tickets.find({zone:zone});
    return {tickets:tickets} 
  }catch(e){
    return {error:e.message};
  }
}

const isZoneValid = (zone) =>{
    return Object.values(zones).includes(zone);
} 




module.exports = {
  _createTicket,
  _deleteTicket,
  _getTickets,
  _getTicket,
  _updateTicketCost,
  _updateTicketBalance,
  _updateTicketZone,
  _getTicketsByZone,
};
