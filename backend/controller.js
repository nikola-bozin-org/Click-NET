const User = require('./user')
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
    const {username,password}=req.body;
    const user = await User.findOne({username});
    if(user!==null){
        res.status(400).json({error:`User with username: ${username} already exists.`});
        return;
    }
    const hashedPassword =  bcrypt.hashSync(password,10);
    try{
        const user = await User.create({username,password:hashedPassword,balance:0,rate:0,discount:0,xp:0});
        res.status(200).json({user:user});
    }catch(e){
        res.status(400).json({error:e.message});
    }
}
///////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////// Auth /////////////////////////////////////////
const authenticateUser = async(req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json({error:`User with username: ${username} does not exist.`})
        return;
    }
    if(bcrypt.compareSync(password,user.password)){
        res.status(200).json({user:user})
    }
    else{
        res.status(400).json({error:`Wrong password.`})
    }
}
///////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////// User Data ////////////////////////////////////

const getUserBalance = async(req,res)=>{
    const {id} = req.params;
    const username=id;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json("User not found.");
        return;
    }
    res.status(200).json({balance:user.balance});
}
const getUserDiscount = async(req,res)=>{
    const {id} = req.params;
    const username=id;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json("User not found.");
        return;
    }
    res.status(200).json({discount:user.discount});
}
const getUserXp = async(req,res)=>{
    const {id} = req.params;
    const username=id;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json("User not found.");
        return;
    }
    res.status(200).json({xp:user.xp});
}
const getUserPayments = async(req,res)=>{
    const {id} = req.params;
    const username=id;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json("User not found.");
        return;
    }
    res.status(200).json({payments:user.payments});
}
const getUserSessions = async(req,res)=>{
    const {id} = req.params;
    const username=id;
    const user = await User.findOne({username});
    if(user===null){
        res.status(400).json("User not found.");
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