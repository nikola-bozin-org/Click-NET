const {User,CashRegisterSessions, Levels} = require('../schemas')
const statusCode = require('../statusCodes')

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

module.exports={
    dropCashRegisterDatabase,
    dropUsersDatabase,
    dropLevelsDatabase,
}