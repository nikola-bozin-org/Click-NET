const { User, Session} = require('../schemas')
const bcrypt = require('bcrypt')
const jwt = require('../jwt')
const memory = require('../server-memory')
const statusCode = require('../statusCodes')



const loginUser = async(req,res)=>{
    res.send("LOGEDIN")
}

const logoutUser = async(req,res)=>{
    res.send("LOGEDOUT")
}


module.exports={
    loginUser,logoutUser
}