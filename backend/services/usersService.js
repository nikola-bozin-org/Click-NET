const {User} = require('../schemas')
const UserActions = require('../helpers/userActions')
const UserActionDescription = require('../helpers/userActionsDescriptions')
const bcrypt = require('bcrypt')


const _getUsers = async ()=>{
    try{
        const users = await User.find({}).sort({ createdAt: -1 });
        return {users:users}
    }catch(e){
        return {error:e.message}
    }
}
const _getUser = async(username) =>{
    try{
        const user = await User.findOne({ username });
        if (user === null) return {erorr:`User ${username} not found.`};
        return { user: user };
    }catch(e){
        return {error:e.message}
    }
}
const _createUser = async(staffName,username,password,firstName,lastName,email,phone)=>{
    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
            const createResult = await User.create({
                username,
                 password: hashedPassword,
                  balance: 0,
                  discount: 0,
                  xp: 0,
                  role:"Default",
                basicInfo: {
                    firstName,
                    lastName,
                    email,
                    phone
                },
                actions:[
                    {
                        name:UserActions.AccountCreation,
                        description:UserActionDescription.AccountCreation(staffName.username,username),
                        date:Date.now(),
                        pcNumber:-1,
                        balanceChange:0
                    }
                ],
                activeTickets:[],
                payments:[]
            });
            return {userCreated:true}
        }catch(e){
            return {error:e.message}
        }
}
const _changePassword = async(username,oldPassword,newPassword,pcNumber) =>{
    try{
        const user = await User.findOne({username});
        if(!user) return {error:`User ${username} does not exist.`};
        if(!bcrypt.compareSync(oldPassword,user.password)) return {error:'Wrong password.'};
        const hashedPassword = await bcrypt.hash(newPassword,10);
        const updatePasswordResult = await User.findOneAndUpdate({username},{
            password:hashedPassword,
            $push:{
                actions:{
                    name:UserActions.PasswordChange,
                    description:UserActionDescription.PasswordChange,
                    date:Date.now(),
                    pcNumber:pcNumber,
                    balanceChange:0
                }}});
        return {message:'Password updated!'}
    }catch(e){
        return {error:e.message}
    }
}


module.exports={
    _getUsers,
    _getUser,
    _createUser,
    _changePassword
}