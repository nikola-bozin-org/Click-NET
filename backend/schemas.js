const mongoose = require("mongoose");
const {userRoles,zones} = require('./helpers/enums')

const currentCashRegister = new mongoose.Schema({
  number:{
    type:Number
  },
  opener: {
    type: String,
  },
  openedAt: {
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
  },
  zone:{
    type:String,
    enum:[zones.Pro,zones.Lobby,zones.Night]
  },
  pcNumber:{
    type:Number
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
      default: userRoles.Default,
      enum:[userRoles.Admin,userRoles.Default,userRoles.Employee]
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
    actions:[{
      name:{
        type:String,
      },
      description:{
        type:String
      },
      date:{
        type:Date
      },
      pcNumber: {
        type: Number,
      },
      balanceChange:{
        type:Number,
      }
    }],
    activeTickets:[{
      name:{
        type:String
      },
      balance:{
        type:Number
      },
      zone:{
        type:String,
        enum:[zones.Pro,zones.Lobby,zones.Night]
      }
    }],
    payments:[{
      paymentAmount: {
        type: Number,
      },
      paymentDate: {
        type: Date,
      },
      receipt:{
        type:String
      }
    }]
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
  zone:{
    type:String,
    enum:[zones.Pro,zones.Lobby,zones.Night]
  }
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
const pcZone = new mongoose.Schema({
  pcNumber:{
    type:Number
  },
  zone:{
    type:String,
    enum:[zones.Pro,zones.Lobby,zones.Night]
  }
})

module.exports = {
  User: mongoose.model("User", userSchema),
  LogedInUsers:mongoose.model("LogedInUsers",logedInUsersSchema),
  Levels: mongoose.model("Levels", levelsSchema),
  Tickets: mongoose.model("Tickets", ticketsSchema),
  CashRegisterSessions:mongoose.model("CashRegisterSessions",cashRegisterSessions),
  CurrentCashRegisterSession:mongoose.model("CurrentCashRegisterSessions",currentCashRegister),
  PCZone:mongoose.model("PCZone",pcZone),
};
