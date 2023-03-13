const jwt = require("../jwt");
const { Tickets,User } = require("../schemas");
const statusCode = require("../statusCodes");


const addUserBalance = async(req,res) =>{
      //ovo moze samo admin da uradi.. da uplati..i employee. verifikacija preok tokeno
    // const token = req.headers.authorization;
    // if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
    const { username, payment } = req.body;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: `User ${username} does not exist.` })
        return;
    }
    const balance = parseInt(user.balance);
    const xp = parseInt(user.xp);
    const payments = user.payments;
    const newBalance = balance + parseInt(payment);
    const newXp = xp + parseInt(payment);

    user.balance = newBalance;
    user.xp = newXp;

    const paymentDate = Date.now();
    try {
    const result = await User.updateOne({username},{balance:newBalance});
        return res.status(statusCode.OK).json({ paymentProcessed: "true",result:result })
    }catch (e) {
          return res.status(statusCode.ERROR).json({ paymentProcessed: "false", error: e.message })
      }

    console.info("TODO");
    // try {
    //     payments.push({ paymentAmount: payment, paymentDate: paymentDate })
    //     await User.updateOne({ username }, { balance: newBalance, xp: newXp, payments: payments });
    //     const recentPayment = await AllPayments.create({ paymentAmount: payment, paymentDate: paymentDate, username: username })
    //     res.status(statusCode.OK).json({ paymentProcessed: "true", payment: recentPayment })
    // } catch (e) {
    //     res.status(statusCode.ERROR).json({ paymentProcessed: "false", error: e.message })
    // }
}

const buyTicket = async (req, res) => {
  console.info("USER");
  const token = req.headers.token;
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
