const { Tickets, User, CurrentCashRegisterSession, LogedInUsers, Levels, Payments } = require("../schemas");
const UserActions = require("../helpers/userActions");
const UserActionsDescriptions = require("../helpers/userActionsDescriptions");
const userService = require('../services/userService')

const _payment = async (username,payment)=>{
    try{     
      const currentCashRegisterSession = await CurrentCashRegisterSession.findOne({});
      if(!currentCashRegisterSession) return {error:'Cash register is not open.'};
      const user = await User.findOne({ username });
      if (user === null) return { error: `User ${username} does not exist.` };
        const date = Date.now();
        const receipt = "00"+date.toString();
        const paymentResult = await Payments.create({username,paymentAmount:payment,paymentDate:date,receipt});
        await User.updateOne({username},{
          $push:{
            actions:{
              name:UserActions.Payment,
              description:UserActionsDescriptions.Payment,
              date:date,
              pcNumber:-1,
              balanceChange:payment
            },
            payments:paymentResult._id,
        }});
        const prevAmount = currentCashRegisterSession.amount;
        const newTotalAmount = prevAmount+payment;
        await CurrentCashRegisterSession.findOneAndUpdate({},{
              $push: { payments:paymentResult._id },$set:{amount:newTotalAmount}
        })
        return {paymentProcessed:true,tableData:{username:username,paymentAmount:payment,paymentDate:date,receipt:receipt}}
    }catch(e){
        return {error:e.message}
    }
}

const _refund = async(username,refund,refunder)=>{
    try{
        const currentCashRegisterSession = await CurrentCashRegisterSession.findOne({});
        if(!currentCashRegisterSession) return {error:'Cash register is not open.'};
        const user = await User.findOne({ username });
        if (user === null) return { error: `User ${username} does not exist.` };
        const balance = parseInt(user.balance);
        if(balance<refund) return {error: `Not enough balance. User balance: ${balance}, wanted refund: ${refund}`}
        const newBalance = balance - parseInt(refund);
        const date = Date.now();
        const receipt = "00"+date.toString();
        const paymentResult = await Payments.create({username,paymentAmount:-refund,paymentDate:date,receipt});
        await User.updateOne({username},{
            $set:{balance:newBalance},
            $push:{
              actions:{
                name:UserActions.Refund,
                description:UserActionsDescriptions.Refund(refunder,refund),
                date:date,
                pcNumber:-1,
                balanceChange:-refund
              },
              payments:paymentResult.id
        }});
          CurrentCashRegisterSession.findOneAndUpdate({},{
            $push:{payments:paymentResult.id}
          })
        return {refundProcessed:true}
    }catch(e){
        return {error:e.message}
    }
}

const _buyTicket = async(username,name,pcNumber)=>{
    try{
      const user = await User.findOne({username});
      if(!user) return {error:`User ${username} does not exist.`};
      const isLogedIn = await LogedInUsers.findOne({username});
      if(!isLogedIn) return {error:`User ${username} is not loged in.`};
      const ticket = await Tickets.findOne({name});
      if(!ticket) return {error:"Invalid ticket name."}
      console.info("User PC Number should match with ticket zone he is in and buying.");
      const userBalance = parseInt(user.balance);
      const userDiscount = parseInt(user.discount);
      const ticketCost = parseInt(ticket.cost);
      const reduction = (100-userDiscount);
      const costForUser = (ticketCost*reduction)/100;
      console.info(`User balance: ${userBalance},User discount: ${userDiscount}, Ticket Price: ${ticketCost}, Reduction: ${100-reduction}%, finalCost: ${costForUser}`)
      if(userBalance<costForUser) return {error:`Not enough balance to buy ${name} ticket.`}
      const userXP = user.xp;
      const newUserXP = userXP+costForUser;
      const newUserBalance = userBalance-costForUser;
      const newDiscount = await calculateDiscount(userXP);
      console.info("New XP: "+newUserXP);
      console.info("New discount: " + newDiscount);
      console.info("Unchecked: User discount at max.");
      const date=Date.now();
      await User.updateOne({username},{
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
          activeTicketIndex:user.activeTickets.length,
          actions:{
            name:UserActions.TicketBought(ticket.name,ticket.balance),
            description:UserActionsDescriptions.TicketBought,
            date:date,
            pcNumber:pcNumber,
            balanceChange:-costForUser
          }
        },
      });
      return {message:`Bought ${name} ticket.`}
    }catch(e){
        return {error:e.message}
    }
}

const _getPaymentByReceipt = async(receipt)=>{
  try{
    const paymentDoc = await Payments.findOne({receipt: String(receipt).trim()})
    if(!paymentDoc) return {error:'Receipt does not exist.'}
    const userBalance = await userService._getUserBalance(paymentDoc.username);
    const payment = paymentDoc.toObject();
    payment.userBalance = userBalance.balance;
    return {payment:payment}
  }catch(e){
    return {error:e.message}
  }
}


const calculateDiscount = async(userXP)=>{
  const levels = await Levels.find({});
  if(!levels) throw Error("Unable to calculate discount. Levels returned are NULL.");
  const length = levels.length;
  let discout = 0;
  let userXPcopy = userXP;
  for(let i=0;i<length;i++){
      userXPcopy-=levels[i].xp;
      if(userXPcopy===0){discout++; return discout;}
      if(userXPcopy<0) return discout;
      discout++;
  }
  return discout;
}

module.exports = {
    _payment,
    _refund,
    _buyTicket,
    _getPaymentByReceipt
}