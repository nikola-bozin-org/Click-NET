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
      type:Number //videti u c# ima pro night defualt tako nesto
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
const allPaymentsSchema = new mongoose.Schema(
  {
    username:{
      type:String
    },
    paymentAmount:{
      type:Number,
    },
    paymentDate:{
      type:Date
    }
  }
)
const levelsSchema = new mongoose.Schema(
  {
    levels:{
      type:[{
        xp:{
          type:Number,
          default:0,
        },
        level:{
          type:Number,
          default:0,
        }
    }]
  }
})

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
    role:{
      type:Number, //0-admin, 1-default, 2-employee
      default:1
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

const ticketsSchema = new mongoose.Schema(
  {
    tickets:{
      type:[{
        name:{
          type:String
        },
        cost:{
          type:Number
        },
        time:{
          type:Number
        }
      }]
    }
  }
)

module.exports = {
  User: mongoose.model("User", userSchema),
  Session: mongoose.model("Session", sessionSchema),
  Payment: mongoose.model("Payment", paymentSchema),
  UserBasicInfo: mongoose.model("UserBasicInfo",userBasicInfoSchema),
  AllPayments:mongoose.model("AllPayments",allPaymentsSchema),
  Levels:mongoose.model("Levels",levelsSchema),
  Tickets:mongoose.model("Tickets",ticketsSchema),
};