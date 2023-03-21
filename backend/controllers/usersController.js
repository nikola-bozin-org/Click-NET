const {User} = require('../schemas')
const bcrypt = require('bcrypt')
const statusCode = require('../statusCodes')
const jwt = require('../jwt')
const UserActions = require('../helpers/userActions')
const UserActionDescription = require('../helpers/userActionsDescriptions')
const {userRoles} = require('../helpers/enums')




const getUsers = async (req, res) => {
    try{
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(statusCode.OK).json({ users: users });
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const getUser = async (req, res) => {
    const { id } = req.params;
    const username = id;
    try{
        const user = await User.findOne({ username });
        if (user === null) {
            return res.status(statusCode.ERROR).json("User not found.");
        }
        res.status(statusCode.OK).json({ user: user });
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const createUser = async (req, res) => {
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:'Unauthorized'});
    const verifyResult = jwt.verify(req.headers.token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:'Invalid Token.'});
    if(verifyResult.role!==userRoles.Admin && verifyResult.role!==userRoles.Employee) return res.status(statusCode.ERROR).json({error:'you are not Admin or Employee.'});
    const { username, password, firstName, lastName, email, phone } = req.body;
    try {
    const user = await User.findOne({ username });
    if (user !== null) return res.status(statusCode.ERROR).json({ error: `User with username: ${username} already exists.` });
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
                    description:UserActionDescription.AccountCreation(verifyResult.username,username),
                    date:Date.now(),
                    pcNumber:-1,
                    balanceChange:0
                }
            ],
            activeTickets:[],
            payments:[]
        });
        return res.status(statusCode.OK).json({ userCreated: true, user: createResult });
    } catch (e) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
const changePassword = async(req,res)=>{
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:'Unauthorized.'})
    const verifyResult = jwt.verify(token);
    if(!verifyResult) return res.status(statusCode.ERROR).json({error:'Invalid token.'});
    const username = verifyResult.username;
    try{
        const user = await User.findOne({username});
        if(!user) return res.status(statusCode.ERROR).json({error:'User does not exist.'});
        const {oldPassword,newPassword} = req.body; 
        if(!bcrypt.compareSync(oldPassword,user.password)) return res.status(statusCode.ERROR).json({error:'Wrong password.'});
        const hashedPassword = await bcrypt.hash(newPassword,10);
        const updatePasswordResult = await User.findOneAndUpdate({username},{
            password:hashedPassword,
            $push:{
                actions:{
                    name:UserActions.PasswordChange,
                    description:UserActionDescription.PasswordChange,
                    date:Date.now(),
                    pcNumber:verifyResult.pcNumber,
                    balanceChange:0
                }}});
        return res.status(statusCode.OK).json({message:"Password changed."});
    }catch(e){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:`Server error: ${e.message}`});
    }
}
module.exports = {
    getUsers,
    getUser,
    createUser,
    changePassword,
}