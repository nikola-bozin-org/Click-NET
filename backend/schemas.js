const mongoose = require("mongoose");

const userSession = new mongoose.Schema(
  {
    //dodati ref na user id i testirati findbyid
    loginDate: {
      type: Date,
    },
    logoutDate: {
      type: Date,
    },
    pcNumber: {
      type: Number,
    },
    sessionType: {
      type: Number,
    },
  },
  { timestamps: true }
);

const cashRegister = new mongoose.Schema({
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
      },
    ],
  },
});

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
    isLogedIn: {
      type: Boolean,
    },
    role: {
      type: Number, //0-admin, 1-default, 2-employee
      default: 1,
    },
    sessions: {
      //dodati ref na sesion
    },
    payments: {
      paymentAmount: {
        type: Number,
      },
      paymentDate: {
        type: Date,
      },
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
  },
  { timestamp: true }
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
  UserSession: mongoose.model("UserSesion", userSession),
  Levels: mongoose.model("Levels", levelsSchema),
  Tickets: mongoose.model("Tickets", ticketsSchema),
};
