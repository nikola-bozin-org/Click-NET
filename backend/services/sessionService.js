const { User, LogedInUsers, Sessions } = require("../schemas");
const bcrypt = require("bcrypt");
const { userRoles } = require("../helpers/enums");
const UserActions = require("../helpers/userActions");
const UserActionsDescriptions = require("../helpers/userActionsDescriptions");
const jwt = require("../jwt");

const _loginStaff = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (user === null)
      return { error: `User with username: ${username} does not exist.` };
    if (!bcrypt.compareSync(password, user.password))
      return { error: `Wrong password.` };
    if (user.role !== userRoles.Admin && user.role !== userRoles.Employee)
      return { error: `You are not Admin or Employee` };
    const date = Date.now();
    const isLogedIn = await LogedInUsers.findOne({ username });
    // if (isLogedIn) return { error: `User with username: ${username} is already loged in.` };
    const newSession = await Sessions.create({
      startDate: date,
      pcNumber: -1,
      username: username,
    });
    if (!isLogedIn) {
      await LogedInUsers.create({
        username: username,
        pcNumber: -1,
        sessionId: newSession._id,
      });
      await User.updateOne(
        { username },
        {
          $push: {
            actions: {
              name: UserActions.Login,
              description: UserActionsDescriptions.Login(0),
              date: date,
              pcNumber: -1,
              balanceChange: 0,
            },
            sessions: newSession._id,
          },
        }
      );
    }
    const accessToken = jwt.sign({
      username: user.username,
      role: user.role,
      sessionId: newSession._id,
    });
    return { accessToken: accessToken, user: user };
  } catch (e) {
    return { error: e.message };
  }
};
const _loginUser = async (username, password, pcNumber) => {
  try {
    const user = await User.findOne({ username });
    if (user === null)
      return { error: `User with username: ${username} does not exist.` };
    const isLogedIn = await LogedInUsers.findOne({ username });
    if (isLogedIn)
      return { error: `User with username: ${username} is already loged in.` };
    if (!bcrypt.compareSync(password, user.password))
      return { error: `Wrong password.` };
    console.info("Calculate session rate by session type");
    const date = Date.now();
    const newSession = await Sessions.create({
      startDate: date,
      pcNumber: pcNumber,
      username: username,
    });
    await LogedInUsers.create({
      username: username,
      pcNumber: pcNumber,
      sessionId: newSession._id,
    });
    await User.updateOne(
      { username },
      {
        $push: {
          actions: {
            name: UserActions.Login,
            description: UserActionsDescriptions.Login("TO CALCULATE"),
            date: date,
            pcNumber: pcNumber,
            balanceChange: 0,
          },
          sessions: newSession._id,
        },
      }
    );
    const accessToken = jwt.sign({
      username: user.username,
      role: user.role,
      pcNumber: pcNumber,
      activeTickets: user.activeTickets,
      balance: user.balance,
      lastSessionId: newSession._id,
      discount: user.discount,
    });
    return { accessToken: accessToken, user: user };
  } catch (e) {
    return { error: e.message };
  }
};
const _logoutUser = async (username, pcNumber, lastSessionId) => {
  try {
    const isLogedIn = await LogedInUsers.findOne({ username });
    if (!isLogedIn)
      return { error: `User with username: ${username} is not loged in.` };
    const endDate = Date.now();
    await LogedInUsers.deleteOne({ username: username });
    const userSession = await Sessions.findById(lastSessionId);
    const startDate = new Date(userSession.startDate);
    const minutes = Math.floor(
      (Math.floor(endDate / 1000) - Math.floor(startDate.getTime() / 1000)) / 60
    );
    userSession.endDate = endDate;
    userSession.minutes = minutes;
    userSession.save();
    await User.updateOne(
      { username: username },
      {
        $push: {
          actions: {
            name: UserActions.Logout,
            description: UserActionsDescriptions.Logout,
            date: endDate,
            pcNumber: pcNumber,
            balanceChange: 0,
          },
        },
      }
    );
    return { message: `User ${username} logged out.` };
  } catch (e) {
    return { error: e.message };
  }
};
const _logoutAllUsers = async (staffName) => {
  try {
    const date = Date.now();
    const logedInUsers = await LogedInUsers.find({});
    for (let i = 0; i < logedInUsers.length; i++) {
      const element = logedInUsers[i];
      const username = element.username;
      console.info(element);
      const userSession = await Sessions.findById(element.sessionId);
      const startDate = new Date(userSession.startDate);
      const minutes = Math.floor(
        (Math.floor(date / 1000) - Math.floor(startDate.getTime() / 1000)) / 60
      );
      userSession.endDate = date;
      userSession.minutes = minutes;
      userSession.save();
      await LogedInUsers.deleteOne({ username });
      await User.updateOne(
        { username },
        {
          $push: {
            actions: {
              name: UserActions.Logout,
              description: UserActionsDescriptions.LogoutByStaff(staffName),
              date: date,
              pcNumber: -1,
              balanceChange: 0,
            },
          },
        }
      );
    }
    return { message: "Users loged out." };
  } catch (e) {
    return { error: e.message };
  }
};
const _getLoggedInUsers = async () => {
  try {
    const users = await LogedInUsers.find({});
    return { logedInUsers: users };
  } catch (e) {
    return { error: e.message };
  }
};
const _getAllSessions = async () => {
  try {
    const sessions = await Sessions.find({});
    return { sessions: sessions };
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = {
  _loginStaff,
  _loginUser,
  _logoutUser,
  _logoutAllUsers,
  _getLoggedInUsers,
  _getAllSessions,
};
