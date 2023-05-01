const mongoose = require("mongoose");
const {userRoles,zones} = require('./helpers/enums')


const payments = new mongoose.Schema({
  username:{type:String,required:true},
  paymentAmount:{type:Number,required:true},
  paymentDate:{type:Date},
  receipt:{type:String}
})
const sessions = new mongoose.Schema({
  username:{type:String,required:true},
  startDate:{type:Date,required:true},
  endDate:{type:Date},
  minutes:{type:Number},
  pcNumber:{type:Number,required:true},
})
const workstation = new mongoose.Schema({
  nubmer:{type:Number},
  IP:{type:String},
  MAC:{type:String},
  zone:{type:String,enum:[zones.Pro,zones.Lobby]},
  gridPosition:{x:{type:Number,required:true},y:{type:Number,required:true}}
})

const currentCashRegister = new mongoose.Schema({
  number:{type:Number},
  opener: {type: String,required:true},
  openedAt: {type: Date},
  payments: {type: [{type:mongoose.SchemaTypes.ObjectId,ref:'Payments'}]},
  amount:{type:Number}
},{timestamp:true});

const cashRegisterSessions = new mongoose.Schema({
  number:{type:Number},
  opener: {type: String,required:true},
  openedAt: {type: Date},
  closedAt: {type: Date},
  payments: {type: [{type:mongoose.SchemaTypes.ObjectId,ref:'Payments'}]},
  amount:{type:Number}
});
const logedInUsersSchema = new mongoose.Schema({
  username:{type:String},
  pcNumber:{type:Number},
  sessionId:{type:mongoose.SchemaTypes.ObjectId,ref:'Sessions'}
})
const userSchema = new mongoose.Schema({
    username: {type: String,required:true,unique:true},
    password: {type: String,required:true},
    balance: {type: Number},
    discount: {type: Number},
    xp: {type: Number},
    role: {type: String, default: userRoles.Default,enum:[userRoles.Admin,userRoles.Default,userRoles.Employee]},
    basicInfo: {
      firstName: {type: String},
      lastName: {type: String},
      email: {type: String},
      phone: {type: String},
    },
    actions:[{
      name:{type:String},
      description:{type:String},
      date:{type:Date},
      pcNumber: {type: Number},
      balanceChange:{type:Number}
    }],
    activeTickets:[{
      name:{type:String},
      balance:{type:Number},
      zone:{type:String,enum:[zones.Pro,zones.Lobby]}
    }],
    activeTicketIndex:{type:Number},
    payments:[{type:mongoose.SchemaTypes.ObjectId,ref:'Payments'}],
    sessions:[{type:mongoose.SchemaTypes.ObjectId,ref:'Sessions'}],
    favoriteGames:[{type:Number}]
  },{ timestamp: true }
);
const ticketsSchema = new mongoose.Schema({
  name: {type: String,required:true,unique:true,},
  cost: {type: Number,required:true,},
  balance: {type: Number,required:true},
  zone:{type:String,enum:[zones.Pro,zones.Lobby],required:true},
  availability:{
    start: {type: String,required: true,match: /^([0-1][0-9]|2[0-3]):[0-0][0-0]$/},
    end: {type: String,required: true,match: /^([0-1][0-9]|2[0-3]):[0-0][0-0]$/},
  }
});
const levelsSchema = new mongoose.Schema({
  xp: {type: Number,required:true},
  level: {type: Number,required:true,unique:true},
});

const utils = new mongoose.Schema({
  utility:{
    workstationLimit:{type:Number,required:true},
    centerName:{type:String,required:true},
    numberOfWorkstations:{type:Number},
    currency:{type:String},
    gamesVersion:{type:Number}
  }
})
const games = new mongoose.Schema({
  name: { type: String, required: true,unique:true },
  category: { type: String, enum: ["App", "Game"], required: true },
  lastModified: { type: Date, required: true },
  enabled: { type: Boolean },
  image: { data: Buffer, contentType: String },
  installationPath: { type: String, required: true }
});


module.exports = {
  User: mongoose.model("User", userSchema),
  LogedInUsers:mongoose.model("LogedInUsers",logedInUsersSchema),
  Levels: mongoose.model("Levels", levelsSchema),
  Tickets: mongoose.model("Tickets", ticketsSchema),
  CashRegisterSessions:mongoose.model("CashRegisterSessions",cashRegisterSessions),
  CurrentCashRegisterSession:mongoose.model("CurrentCashRegisterSessions",currentCashRegister),
  Payments:mongoose.model("Payments",payments),
  Utils:mongoose.model("Utils",utils),
  Sessions:mongoose.model("Sessions",sessions),
  Workstation:mongoose.model("Workstation",workstation),
  Games:mongoose.model("Games",games),
};
