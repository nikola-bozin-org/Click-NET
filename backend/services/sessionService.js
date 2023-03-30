const {User, LogedInUsers} = require('../schemas')
const bcrypt = require('bcrypt')
const {userRoles} = require('../helpers/enums')
const UserActions = require("../helpers/userActions");
const UserActionsDescriptions = require("../helpers/userActionsDescriptions");
const jwt = require('../jwt')

const _loginStaff = async (username,password)=>{
    try{
        const user = await User.findOne({ username });
        if (user === null) return { error: `User with username: ${username} does not exist.` }
        const isLogedIn = await LogedInUsers.findOne({username})
        if (!bcrypt.compareSync(password, user.password)) return { error: `Wrong password.` }
        if(user.role!==userRoles.Admin && user.role !== userRoles.Employee) return {error:`You are not Admin or Employee`};
            const date = Date.now();
            if(!isLogedIn) await LogedInUsers.create({username:username});
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
            return {accessToken:accessToken}
    }catch(e){
        return {error:e.message}
    }
}
const _loginUser = async(username,password,pcNumber)=>{
    try{
        const user = await User.findOne({ username });
        if (user === null) return { error: `User with username: ${username} does not exist.` }
        const isLogedIn = await LogedInUsers.findOne({username})
        if(isLogedIn) return {error:`User with username: ${username} is already loged in.`};
        if (!bcrypt.compareSync(password, user.password)) return { error: `Wrong password.` }
        console.info("Calculate session rate by session type")
            const date = Date.now();
            const logedInUsersResult = await LogedInUsers.create({username:username});
            const userResult = await User.updateOne({ username },
                {
                    $push: {
                        actions:{
                        name:UserActions.Login,
                        description:UserActionsDescriptions.Login(''),
                        date:date,
                        pcNumber:pcNumber,
                        balanceChange:0,
                    }}
            })
            const accessToken = jwt.sign({username:user.username,role:user.role,pcNumber:pcNumber})
            return {accessToken:accessToken}
    }catch(e){
        return {error:e.message}
    }
}
const _logoutUser = async(username,pcNumber) =>{
    try{
        const isLogedIn = await LogedInUsers.findOne({username})
        if(!isLogedIn) return {error:`User with username: ${username} is not loged in.`}
        const date = Date.now();
        const logedInUsersResult = await LogedInUsers.deleteOne({username:username})
        const userResult = await User.updateOne({ username:username },
            {
                $push: {
                    actions:{
                    name:UserActions.Logout,
                    description:UserActionsDescriptions.Logout,
                    date:date,
                    pcNumber:pcNumber,
                    balanceChange:0,
                }}
        })
        return {message:`User ${username} logged out.`}
    }catch(e){
        return {error:e.message}
    }
}
const _logoutAllUsers = async(staffName)=>{
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
                        description:UserActionsDescriptions.LogoutByStaff(staffName),
                        date:date,
                        pcNumber:-1,
                        balanceChange:0,
                    }
                }
            })
        });
        return {message:"Users loged out."};
    }catch(e){
        return {error:e.message}
    }
}

const _getLoggedInUsers = async()=>{
    try{
        const users =await LogedInUsers.find({});
        return {logedInUsers:users};

    }catch(e){
        return {error:e.message}
    }
}

module.exports = {
    _loginStaff,
    _loginUser,
    _logoutUser,
    _logoutAllUsers,
    _getLoggedInUsers,
}