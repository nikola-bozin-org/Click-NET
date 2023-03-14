const jwt = require("../jwt");
const { Tickets,User,CurrentCashRegisterSession } = require("../schemas");
const statusCode = require("../statusCodes");


const addUserBalance = async(req,res) =>{
    const token = req.headers.token;
    if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
    const verifyResult = jwt.verify(token);
    const staffUsername = verifyResult.username;
    if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token" });
    const { username, payment } = req.body;
    const user = await User.findOne({ username });
    if (user === null) return res.status(statusCode.ERROR).json({ error: `User ${username} does not exist.` });
    const staffData = await User.findOne({username:staffUsername})
    const isAdmin = staffData.role==="Admin";
    const isEmployee = staffData.role==="Employee"
    if(!isAdmin && !isEmployee) return res.status(statusCode.ERROR).json({error:`User ${username} is not Admin or Employee`});


    const balance = parseInt(user.balance);
    const xp = parseInt(user.xp);
    const newBalance = balance + parseInt(payment);
    const newXp = xp + parseInt(payment);


    try {
      const resultUser = await User.updateOne({username},{balance:newBalance,xp:newXp});
      const paymentDate = Date.now();
      const resultPayment = await CurrentCashRegisterSession.findOneAndUpdate({
            $push: { payments:{username:username,paymentAmount:payment,paymentDate:paymentDate} }
      })
      return res.status(statusCode.OK).json({ paymentProcessed: "true",resultUser:resultUser,resultPayment:resultPayment })
    }catch (e) {
      return res.status(statusCode.ERROR).json({ paymentProcessed: "false", error: e.message })
    }

}

const buyTicket = async (req, res) => {
  console.info("USER");
  const token = req.headers.token;
  if(!token) return res.status(statuscode.ERROR).json({error:"Unauthorized"});
  const result = jwt.verify(token);
  if (!result)
    return res.status(statusCode.ERROR).json({ error: "Invalid token" });
  const username = result.username;
  const user = await User.findOne({username});
  if(!user) return res.status(statusCode.ERROR).json({error:`User ${username} does not exist.`});
  const { name } = req.body;
  const ticket = await Tickets.findOne({name});
  if(!ticket) return res.status(statusCode.ERROR).json({error:"Invalid ticket name"})
  const userBalance = parseInt(user.balance);
  const userDiscount = parseInt(user.discount);
  const ticketCost = parseInt(ticket.cost);
  const reduction = 100-userDiscount;
  const costForUser = (ticketCost*reduction)/100;
  console.info(`User balance ${userBalance}, User discount: ${userDiscount}, Ticket Price; ${ticketCost}, Reduction: ${reduction}, finalCost: ${costForUser}`)
  if(userBalance<costForUser) return res.status(statusCode.ERROR).json({error:`Not enough balance to buy ${name} ticket.`})
  console.info("decrease user balance")
  console.info("add ticket to user  current tickets");
  res.status(statusCode.OK).json({ result: `Ticket ${name} bought.` });
};

module.exports = {
  buyTicket,
  addUserBalance,
};
