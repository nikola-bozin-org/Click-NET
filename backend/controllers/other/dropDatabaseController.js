const {User,CashRegisterSessions, Levels, Tickets, LogedInUsers} = require('../../schemas')
const statusCode = require('../../statusCodes')

const dropCashRegisterDatabase = async(req,res)=>{
    const result = await CashRegisterSessions.deleteMany({});
    res.status(statusCode.OK).json({message:"Database CashRegister deleted."});
}
const dropUsersDatabase = async(req,res)=>{
    const result = await User.deleteMany({});
    res.status(statusCode.OK).json({message:"Database User deleted."})
}
const dropLevelsDatabase = async (req,res)=>{
    const result = await Levels.deleteMany({});
    res.status(statusCode.OK).json({message:"Database Levels deleted."})
}
const dropTicketsDatabase = async(req,res)=>{
    const result = await Tickets.deleteMany({});
    res.status(statusCode.OK).json({message:"Database Tickets deleted."})
}
const dropLogedInUsers = async(req,res)=>{
    await LogedInUsers.deleteMany({});
    res.status(statusCode.OK).json({message:"Database LogedInUsers deleted."})
}

module.exports={
    dropCashRegisterDatabase,
    dropUsersDatabase,
    dropLevelsDatabase,
    dropTicketsDatabase,
    dropLogedInUsers
}