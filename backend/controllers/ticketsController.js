
const statusCode = require('../statusCodes')



const createTicket = async (req,res)=>{
    console.info("Hello");
    res.status(statusCode.OK).json({result:"Ticket created"});
}


module.exports={
    createTicket
}