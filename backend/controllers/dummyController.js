const {User,CashRegisterSessions} = require('../schemas')
const statusCode = require('../statusCodes')



const createDummyCashRegisterSessions = async(req,res)=>{
    const now = new Date();
    const start = new Date('2021-01-01T00:00:00Z');
    const range = now.getTime() - start.getTime();
    for (let i = 0; i < 10; i++) {
      const number = await CashRegisterSessions.countDocuments();
      const opener = `Opener ${i}`;
      const startedAt = new Date(start.getTime() + Math.random() * range);
      const closedAt = new Date(startedAt.getTime() + Math.random() * range);
      const payments = [];
      const numPayments = Math.floor(Math.random() * 4) + 2;
      for (let j = 0; j < numPayments; j++) {
        const username = `User ${j}`;
        const paymentAmount = Math.floor(Math.random() * 951) + 50;
        const paymentDate = new Date(startedAt.getTime() + Math.random() * (closedAt.getTime() - startedAt.getTime()));
        payments.push({ username, paymentAmount, paymentDate });
      }
      const amount = payments.reduce((acc, cur) => acc + cur.paymentAmount, 0);
      await CashRegisterSessions.create({number,opener,startedAt,closedAt,payments,amount})
    }
    res.status(statusCode.OK).json({message:"Sessions are being created."});
  }


  module.exports={
    createDummyCashRegisterSessions
  }