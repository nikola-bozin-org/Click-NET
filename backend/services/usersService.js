const {User} = require('../schemas')
const UserActions = require('../helpers/userActions')
const UserActionDescription = require('../helpers/userActionsDescriptions')
const bcrypt = require('bcrypt')
const jwt = require('../jwt')
const { userRoles } = require('../helpers/enums')
require('dotenv').config()

const _getUsers = async (amountToReturn,page)=>{
    try{
        const limit = parseInt(amountToReturn, 10);
        const skip = (parseInt(page, 10)) * limit;
        const users = await User.find({},{password: 0, __v: 0}).populate(['payments','sessions']).limit(limit).skip(skip);;
        return {users:users}
    }catch(e){
        return {error:e.message}
    }
}
const _getUser = async(username) =>{
    try{
        const user = await User.findOne({ username },{password: 0, __v: 0}).populate(['payments','sessions']);
        if (user === null) return {erorr:`User ${username} not found.`};
        return { user: user };
    }catch(e){
        return {error:e.message}
    }
}
const _createUser = async(staffName,username,password,firstName,lastName,email,phone)=>{
    try {
        const actionObject = {
            name:UserActions.AccountCreation,
            description:UserActionDescription.AccountCreation(staffName,username),
            date:Date.now(),
            pcNumber:-1,
            balanceChange:0
        }
        const hashedPassword = bcrypt.hashSync(password,parseInt(process.env.BCRYPT_SALT));
            await User.create({
                username,
                 password: hashedPassword,
                  balance: 0,
                  discount: 0,
                  xp: 0,
                  role:userRoles.Default,
                basicInfo: {
                    firstName,
                    lastName,
                    email,
                    phone
                },
                actions:[actionObject],
                activeTickets:[],
                payments:[]
            });
            const user = await User.findOne({username},{password: 0, __v: 0})
            return {userCreated:true,user:user}
        }catch(e){
            if(e.message && e.message.includes("User validation failed")) return {error:`Invalid data.`}
            if(e.code===11000) return {error:`User ${username} already exist.`}
            return {error:e.message}
        }
}
const _changePassword = async(username,oldPassword,newPassword,pcNumber) =>{
    try{
        const user = await User.findOne({username});
        if(!user) return {error:`User ${username} does not exist.`};
        if(!bcrypt.compareSync(oldPassword,user.password)) return {error:'Wrong password.'};
        const hashedPassword = await bcrypt.hash(newPassword,parseInt(process.env.BCRYPT_SALT));
        await User.findOneAndUpdate({username},{
            password:hashedPassword,
            $push:{
                actions:{
                    name:UserActions.PasswordChange,
                    description:UserActionDescription.PasswordChange,
                    date:Date.now(),
                    pcNumber:pcNumber,
                    balanceChange:0
                }}});
        const newJwt = jwt.sign({username:user.username,role:user.role})
        return {message:'Password updated!',accessToken:newJwt}
    }catch(e){
        return {error:e.message}
    }
}
const _deleteUser = async(username) =>{
    try{
        await User.deleteOne({username});
        return {message:`User ${username} deleted.`}
    }catch(e){
        return {error:e.message}
    }
}


module.exports={
    _getUsers,
    _getUser,
    _createUser,
    _changePassword,
    _deleteUser,
}