const mongoose = require("mongoose");

const currentCashRegister = new mongoose.Schema({
  number:{
    type:Number
  },
  opener: {
    type: String,
  },
  startedAt: {
    type: Date,
  },
  closedAt: {
    type: Date,
  },
  payments: {
    type: [
      {
        username: {
          type: String,
        },
        paymentAmount: {
          type: Number,
        },
        paymentDate: {
          type: Date,
        },
        receipt:{
          type:String
        }
      },
    ],
  },
  amount:{
    type:Number
  }
},{timestamp:true});

const cashRegisterSessions = new mongoose.Schema({
  number:{
    type:Number
  },
  opener: {
    type: String,
  },
  startedAt: {
    type: Date,
  },
  closedAt: {
    type: Date,
  },
  payments: {
    type: [
      {
        username: {
          type: String,
        },
        paymentAmount: {
          type: Number,
        },
        paymentDate: {
          type: Date,
        },
        receipt:{
          type:String
        }
      },
    ],
  },
  amount:{
    type:Number
  }
});


const logedInUsersSchema = new mongoose.Schema({
  username:{
    type:String
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
    balance: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    xp: {
      type: Number,
    },
    role: {
      type: String, 
      default: "Default",
      enum:["Admin","Default","Employee"]
    },
    basicInfo: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    actions:{
      name:{
        type:String,
      },
      description:{
        type:String
      },
      startDate:{
        type:Date
      },
      endDate:{
        type:Date
      },
      pcNumber: {
        type: Number,
      },
      balanceChange:{
        type:Number,
      }
    },
  },{ timestamp: true }
);

const ticketsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  cost: {
    type: Number,
  },
  balance: {
    type: Number,
  },
});
const levelsSchema = new mongoose.Schema({
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Levels: mongoose.model("Levels", levelsSchema),
  Tickets: mongoose.model("Tickets", ticketsSchema),
  CashRegisterSessions:mongoose.model("CashRegisterSessions",cashRegisterSessions),
  CurrentCashRegisterSession:mongoose.model("currentCashRegisterSessions",currentCashRegister),
};
