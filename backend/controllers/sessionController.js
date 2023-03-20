require('dotenv').config()
const {User, LogedInUsers} = require('../schemas')
const bcrypt = require('bcrypt')
const jwt = require('../jwt')
const statusCode = require('../statusCodes')
const UserActions = require("../helpers/userActions");
const UserActionsDescriptions = require("../helpers/userActionsDescriptions");
const userRoles = require('../helpers/userRoles')

const loginStaff = async(req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({ username });
    if (user === null) return res.status(statusCode.ERROR).json({ error: `User with username: ${username} does not exist.` })
    const isLogedIn = await LogedInUsers.findOne({username})
    if(isLogedIn) return res.status(statusCode.ERROR).json({error:`User with username: ${username} is already loged in.`});
    if (!bcrypt.compareSync(password, user.password)) return res.status(statusCode.ERROR).json({ error: `Wrong password.` })
    if(user.role!==userRoles.Admin && user.role !== userRoles.Employee)  res.status(statusCode.ERROR).json({error:`You are not Admin or Employee`});
    try{
        const date = Date.now();
        const logedInUsersResult = await LogedInUsers.create({username:username});
        const userResult = await User.updateOne({username},
            {
                $push:{
                    actions:{
                        name:UserActions.Login,
                        description:UserActionsDescriptions.Login(0),
                        date:date,
                        pcNumber:-1,
                        balanceChange:0,
                    }
                }
            })
        const accessToken = jwt.sign({username:user.username,role:user.role})
        res.status(statusCode.OK).json({accessToken:accessToken})
    }catch(e){
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:e.message})
    }
}
const loginUser = async (req,res) => {
    const { username, password, pcNumber, sessionType } = req.body;
    const user = await User.findOne({ username });
    if (user === null) return res.status(statusCode.ERROR).json({ error: `User with username: ${username} does not exist.` })
    const isLogedIn = await LogedInUsers.findOne({username})
    if(isLogedIn) return res.status(statusCode.ERROR).json({error:`User with username: ${username} is already loged in.`})
    if (!bcrypt.compareSync(password, user.password)) return res.status(statusCode.ERROR).json({ error: `Wrong password.` })
    console.info("Calculate session rate by session type")
    try{
        const date = Date.now();
        const logedInUsersResult = await LogedInUsers.create({username:username});
        const userResult = await User.updateOne({ username },
            {
                $push: {
                    actions:{
                    name:UserActions.Login,
                    description:UserActionsDescriptions.Login(sessionType),
                    date:date,
                    pcNumber:pcNumber,
                    balanceChange:0,
                }}
        })
        const accessToken = jwt.sign({username:user.username,role:user.role,pcNumber:pcNumber})
        res.status(statusCode.OK).json({ user: userResult,accessToken:accessToken })
    }catch(e){
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:e.message})
    }

}
const logoutUser = async (req,res) => {
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."})
    const isLogedIn = await LogedInUsers.findOne({username:verifyResult.username})
    if(!isLogedIn) return res.status(statusCode.ERROR).json({error:`User with username: ${verifyResult.username} is not loged in.`})
    try{
        const date = Date.now();
        const logedInUsersResult = await LogedInUsers.deleteOne({username:verifyResult.username})
        const userResult = await User.updateOne({ username:verifyResult.username },
            {
                $push: {
                    actions:{
                    name:UserActions.Logout,
                    description:UserActionsDescriptions.Logout,
                    date:date,
                    pcNumber:verifyResult.pcNumber,
                    balanceChange:0,
                }}
        })
        return res.status(statusCode.OK).json({message:`User ${verifyResult.username} logged out.`})
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:e.message})
    }
}
const logoutAllUsers = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:"Unauthorized."});
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:"Invalid token."});
    if(verifyResult.role!==userRoles.Admin && verifyResult.role!==userRoles.Employee) return res.status(statusCode.ERROR).json({error:"You are not Admin or Employee"});
    try{
        const date = Date.now();
        const logedInUsers = await LogedInUsers.find({});
        logedInUsers.forEach(async(element) => {
            const username = element.username;
            await LogedInUsers.deleteOne({username});
            await User.updateOne({username},{
                $push:{
                    actions:{
                        name:UserActions.Logout,
                        description:UserActionsDescriptions.LogoutByStaff(verifyResult.username),
                        date:date,
                        pcNumber:-1,
                        balanceChange:0,
                    }
                }
            })
        });
        return res.status(statusCode.OK).json({message:"Users loged out."});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:e.message});
    }
}

// const getLoggedInUsers = async(req,res)=>{
//     const users =await User.find({isLogedIn:true},{username:1,_id:0});
//     res.status(statusCode.OK).json({logedInUsers_Database:users});
// }
const getLoggedInUsers = async(req,res)=>{
    const users =await LogedInUsers.find({});
    res.status(statusCode.OK).json({logedInUsers:users});
}


module.exports={
    loginUser,
    logoutUser,
    loginStaff,
    getLoggedInUsers,
    logoutAllUsers
}