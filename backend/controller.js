const { User, Session, Payment,UserBasicInfoSchema } = require('./user')
const mongoose = require('mongoose')
mongoose.set('strictQuery',true);
const bcrypt = require('bcrypt')





//////////////////////////////////// Users ////////////////////////////////////////
const getUsers = async(req,res)=>{
    const users = await User.find({}).sort({createdAt:-1});
    res.status(200).json({users:users});
}
const getUser = async(req,res)=>{
    const {id} = req.params;
    const username = id;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json("User not found.");
        return;
    }
    res.status(200).json({user:user});
}
const createUser = async(req,res)=>{
    const {username,password,firstName,lastName,email,phone}=req.body;
    console.info("Creating User "+username);
    const user = await User.findOne({username});
    if(user!==null){
        res.status(400).json({error:`User with username: ${username} already exists.`});
        return;
    }
    const hashedPassword =  bcrypt.hashSync(password,10);
    try{
        const user = await User.create({username,password:hashedPassword,balance:0,rate:0,discount:0,xp:0,
        basicInfo:{
            firstName,
            lastName,
            email,
            phone
          }});
        res.status(200).json({userCreated:true, user:user});
    }catch(e){
        res.status(400).json({userCreated:false, error:e.message});
    }
}
///////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////// Auth /////////////////////////////////////////
const authenticateUser = async(req,res)=>{
    const {username,password,pcNumber,sessionType} = req.body;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json({error:`User with username: ${username} does not exist.`})
        return;
    }
    if(bcrypt.compareSync(password,user.password)){
        await loginUser(username,pcNumber,sessionType);
        res.status(200).json({user:user})
    }
    else{
        res.status(400).json({error:`Wrong password.`})
    }
}

const logoutUser = async(username)=>{
    console.info("user must be loged in");
    const lastSession = await getLastSession(username);
    lastSession.logoutDate=Date.now();
    await User.updateOne(
        { username: username, "sessions._id": lastSession._id },
        { $set: { "sessions.$.logoutDate": lastSession.logoutDate } }
      );
}
///////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////// User Data ////////////////////////////////////

const getUserBalance = async(req,res)=>{
    const {id} = req.params;
    const username=id;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json({error:"User not found."});
        return;
    }
    res.status(200).json({balance:user.balance});
}
const getUserDiscount = async(req,res)=>{
    const {id} = req.params;
    const username=id;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json({error:"User not found."});
        return;
    }
    res.status(200).json({discount:user.discount});
}
const getUserXp = async(req,res)=>{
    const {id} = req.params;
    const username=id;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json({error:"User not found."});
        return;
    }
    res.status(200).json({xp:user.xp});
}
const getUserPayments = async(req,res)=>{
    const {id} = req.params;
    const username=id;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json({error:"User not found."});
        return;
    }
    res.status(200).json({payments:user.payments});
}
const getUserSessions = async(req,res)=>{
    const {id} = req.params;
    const username=id;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json({error:"User not found."});
        return;
    }
    res.status(200).json({sessions:user.sessions});
}

///////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////// Interactions ////////////////////////////////////
const payment = async (req,res)=>{
    const {username,payment} = req.body;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json({error:`User ${username} does not exist.`})
        return;
    }
    const balance = parseInt(user.balance);
    const xp = parseInt(user.xp);
    const payments = user.payments;
    const newBalance = balance + parseInt(payment);
    const newXp = xp + parseInt(payment);
    
    user.balance=newBalance;
    user.xp=newXp;

    payments.push({paymentAmount:payment,paymentDate:Date.now()})
    try{
        await User.updateOne({username},{balance:newBalance,xp:newXp,payments:payments});
        res.status(200).json({paymentProcessed:"true"})
    }catch(e){
        res.send(400).json({paymentProcessed:"false"})
    }
}
///////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////// Helpers   ////////////////////////////////////

const loginUser = async(username,pcNumber,sessionType)=>{
    console.info("way to dettecte if login is sucessfull");
    console.info("is user already loged in?");
    const loginDate = Date.now();
    const session = await Session.create({loginDate:loginDate,logoutDate:undefined,pcNumber:pcNumber,sessionType:sessionType})
    await User.updateOne({username},
        {
         $set: {isLogedIn:true},
         $push:{sessions:session}
    })
}


const getLastSession = async (username) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error(`User ${username} not found`);
    }
    if (user.sessions.length === 0) {
      throw new Error(`User ${username} has no sessions`);
    }
    const lastSession = user.sessions[user.sessions.length - 1];
    return lastSession;
  };
///////////////////////////////////////////////////////////////////////////////////




module.exports={
    getUsers,
    createUser,
    authenticateUser,
    payment,
    getUser,
    getUserBalance,
    getUserDiscount,
    getUserXp,
    getUserPayments,
    getUserSessions
}