const mongoose = require("mongoose");


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
    payments:{
      type:[paymentSchema]
    },
    sessions:{
      type:[sessionSchema]
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
