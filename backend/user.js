const mongoose = require("mongoose");

const userBasicInfoSchema = new mongoose.Schema(
  {
    firstName:{
      type:String
    },
    lastName:{
      type:String
    },
    email:{
      type:String
    },
    phone:{
      type:String
    },
  }
)
const sessionSchema = new mongoose.Schema(
  {

    loginDate:{
      type:Date
    },
    logoutDate:{
      type:Date
    },
    pcNumber:{
      type:Number
    },
    sessionType:{
      type:Number
    },
  }
)
const paymentSchema = new mongoose.Schema(
  {
    paymentAmount:{
      type:Number
    },
    paymentDate:{
      type:Date
    }
  }
)
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    balance: {  //koliko pare sada ima uplaceno
      type: Number,
    },
    discount:{ //trenutni discount u %.  
      type:Number,
    },
    xp:{      //koliko dinara je ukupno uplatio. 1dinar = 1xp
      type:Number,
    },
    isLogedIn:{
      type:Boolean,
    },
    payments:{
      type:[paymentSchema]
    },
    sessions:{
      type:[sessionSchema]
    },
    basicInfo:{
      type:userBasicInfoSchema
    }
  },
  { timestamp: true }
);

module.exports = {
  User: mongoose.model("User", userSchema),
  Session: mongoose.model("Session", sessionSchema),
  Payment: mongoose.model("Payment", paymentSchema),
  UserBasicInfoSchema: mongoose.model("UserBasicInfo",userBasicInfoSchema),
};