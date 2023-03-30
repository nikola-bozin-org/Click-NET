const jwt = require("../jwt");
const { Tickets, User, CurrentCashRegisterSession, LogedInUsers } = require("../schemas");
const statusCode = require("../statusCodes");
const UserActions = require("../helpers/userActions");
const UserActionsDescriptions = require("../helpers/userActionsDescriptions");
const calculateUserDiscount = require("../helpers/userDiscountCalculator")
const {userRoles} = require('../helpers/enums')

const payment = async(req,res) =>{
    const token = req.headers.token;
    if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
    const verifyResult = jwt.verify(token);
    if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token" });
    try {
      const currentCashRegisterSession = await CurrentCashRegisterSession.findOne({});
      if(!currentCashRegisterSession) return res.status(statusCode.ERROR).json({error:'Cash register is not open.'});
      if(!(verifyResult.role===userRoles.Admin) && !(verifyResult.role===userRoles.Employee)) return res.status(statusCode.ERROR).json({error:`User ${username} is not Admin or Employee`});
      
      const { username, payment } = req.body;
      const user = await User.findOne({ username });
      if (user === null) return res.status(statusCode.ERROR).json({ error: `User ${username} does not exist.` });
      const balance = parseInt(user.balance);
      const newBalance = balance + parseInt(payment);


        const date = Date.now();
        const receipt = "00"+date.toString();
        const resultUser = await User.updateOne({username},{
          $set:{balance:newBalance},
          $push:{
            actions:{
              name:UserActions.Payment,
              description:UserActionsDescriptions.Payment,
              date:date,
              pcNumber:-1,
              balanceChange:payment
            },
            payments:{
              paymentAmount:payment,
              paymentDate:date,
              receipt:receipt
            }
        }});
        const prevPayments = currentCashRegisterSession.payments;
        const totalPayments = prevPayments.reduce((acc,cur)=>acc+cur.paymentAmount,0);
        const resultPayment = await CurrentCashRegisterSession.findOneAndUpdate({},{
              $push: { payments:{username:username,paymentAmount:payment,paymentDate:date,receipt:receipt} },$set:{amount:totalPayments}
        })
        return res.status(statusCode.OK).json({ paymentProcessed: "true"})
    }catch (e) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ paymentProcessed: "false", error: `Server error: ${e.message}`})
    }
}
const refund = async(req,res)=>{
  const token = req.headers.token;
  if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
  const verifyResult = jwt.verify(token);
  if (!verifyResult) return res.status(statusCode.ERROR).json({ error: "Invalid token" });
  try{
    const currentCashRegisterSession = await CurrentCashRegisterSession.findOne({});
    if(!currentCashRegisterSession) return res.status(statusCode.ERROR).json({error:'Cash register is not open.'});
    if(!(verifyResult.role===userRoles.Admin) && !(verifyResult.role===userRoles.Employee)) return res.status(statusCode.ERROR).json({error:`User ${username} is not Admin or Employee`});

    const { username, refund } = req.body;
    const user = await User.findOne({ username });
    if (user === null) return res.status(statusCode.ERROR).json({ error: `User ${username} does not exist.` });
    const balance = parseInt(user.balance);
    if(balance<refund) return res.status(statusCode.ERROR).json({error: `Not enough balance. User balance: ${balance}, wanted refund: ${refund}`})
    const newBalance = balance - parseInt(refund);
    const date = Date.now();
    await User.updateOne({username},{
        $set:{balance:newBalance},
        $push:{
          actions:{
            name:UserActions.Refund,
            description:UserActionsDescriptions.Refund(verifyResult.username,refund),
            date:date,
            pcNumber:-1,
            balanceChange:-refund
      }}});
      currentCashRegisterSession.findOneAndUpdate({},{
        $push:{payments:{username:username,paymentAmount:-payment,paymentDate:date,receipt:"00"+date.toString()}}
      })
      return res.status(statusCode.OK).json({ refundProcessed: "true"})
  }catch(e){
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ refundProcessed: "false", error: `Server error: ${e.message}` })
  }
  
}
const buyTicket = async (req, res) => {
  const token = req.headers.token;
  if(!token) return res.status(statuscode.ERROR).json({error:"Unauthorized."});
  const result = jwt.verify(token);
  if (!result) return res.status(statusCode.ERROR).json({ error: "Invalid token." });
  const username = result.username;
  try{
    const user = await User.findOne({username});
    if(!user) return res.status(statusCode.ERROR).json({error:`User ${username} does not exist.`});
    const isLogedIn = await LogedInUsers.findOne({username:result.username});
    if(!isLogedIn) return res.status(statuscode.ERROR).json({error:`User ${verifyResult.username} is not loged in.`});
    const { name } = req.body;
    const ticket = await Tickets.findOne({name});
    if(!ticket) return res.status(statusCode.ERROR).json({error:"Invalid ticket name."})
    const userBalance = parseInt(user.balance);
    const userDiscount = parseInt(user.discount);
    const ticketCost = parseInt(ticket.cost);
    const reduction = (100-userDiscount);
    const costForUser = (ticketCost*reduction)/100;
    console.info(`User balance: ${userBalance},User discount: ${userDiscount}, Ticket Price: ${ticketCost}, Reduction: ${100-reduction}%, finalCost: ${costForUser}`)
    if(userBalance<costForUser) return res.status(statusCode.ERROR).json({error:`Not enough balance to buy ${name} ticket.`})
    
    const userXP = user.xp;
    const newUserXP = userXP+costForUser;
    const newUserBalance = userBalance-costForUser;
    const newDiscount = await calculateUserDiscount(userXP);
    // console.error("STA AKO UZER DISCOUNT DODJE DO MAX-a??")
    console.info("New XP: "+newUserXP);
    console.info("New discount: " + newDiscount);
    
    const date=Date.now();
    const userResult = await User.updateOne({username},{
      $set:{
        xp:newUserXP,
        balance:newUserBalance,
        discount:newDiscount
      },
      $push:{
        activeTickets:{
          name:ticket.name,
          balance:ticket.balance
        },
        actions:{
          name:UserActions.TicketBought(ticket.name,ticket.balance),
          description:UserActionsDescriptions.TicketBought,
          date:date,
          pcNumber:result.pcNumber,
          balanceChange:-costForUser
        }
      },
    });
  res.status(statusCode.OK).json({ result: `Ticket ${name} bought.` });
  }catch(e){
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`})
  }
};


module.exports = {
  buyTicket,
  payment,
  refund,
};
