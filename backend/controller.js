const { User, Session, Payment, UserBasicInfo, AllPayments } = require('./user')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const bcrypt = require('bcrypt')
const jwt = require('./jwt')
const memory = require('./server-memory')

const statusCode = {
    OK: 200,
    ERROR: 400,
    UNAUTHORIZED: 401
}

//////////////////////////////////// Users ////////////////////////////////////////
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(statusCode.OK).json({ users: users });
}
const getUser = async (req, res) => {
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json("User not found.");
        return;
    }
    res.status(statusCode.OK).json({ user: user });
}
const createUser = async (req, res) => {
    // console.info("ADMIN OR EMPLOYEE ONLY");
    const { username, password, firstName, lastName, email, phone } = req.body;
    // console.info("Creating User " + username);
    const user = await User.findOne({ username });
    if (user !== null) {
        res.status(statusCode.ERROR).json({ error: `User with username: ${username} already exists.` });
        return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const user = await User.create({
            username,
             password: hashedPassword,
              balance: 0,
              discount: 0,
              xp: 0,
              isLogedIn:false,
              role:1,
            basicInfo: {
                firstName,
                lastName,
                email,
                phone
            },
        });
        res.status(statusCode.OK).json({ userCreated: true, user: user });
    } catch (e) {
        res.status(statusCode.ERROR).json({ userCreated: false, error: e.message });
    }
}
///////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////// Auth /////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////// User Data ////////////////////////////////////

const getUserBalance = async (req, res) => {
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: "User not found." });
        return;
    }
    res.status(statusCode.OK).json({ balance: user.balance });
}
const getUserDiscount = async (req, res) => {
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: "User not found." });
        return;
    }
    res.status(statusCode.OK).json({ discount: user.discount });
}
const getUserXp = async (req, res) => {
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: "User not found." });
        return;
    }
    res.status(statusCode.OK).json({ xp: user.xp });
}
const getUserPayments = async (req, res) => {
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: "User not found." });
        return;
    }
    res.status(statusCode.OK).json({ payments: user.payments });
}
const getUserSessions = async (req, res) => {
    const { id } = req.params;
    const username = id;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: "User not found." });
        return;
    }
    res.status(statusCode.OK).json({ sessions: user.sessions });
}

///////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////// Interactions ////////////////////////////////////
const payment = async (req, res) => {
    //ovo moze samo admin da uradi.. da uplati..i employee. verifikacija preok tokeno
    // const token = req.headers.authorization;
    // if (!token) return res.status(statusCode.UNAUTHORIZED).json({ error: "Unathorized." });
    const { username, payment } = req.body;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: `User ${username} does not exist.` })
        return;
    }
    const balance = parseInt(user.balance);
    const xp = parseInt(user.xp);
    const payments = user.payments;
    const newBalance = balance + parseInt(payment);
    const newXp = xp + parseInt(payment);

    user.balance = newBalance;
    user.xp = newXp;

    const paymentDate = Date.now();

    payments.push({ paymentAmount: payment, paymentDate: paymentDate })
    try {
        await User.updateOne({ username }, { balance: newBalance, xp: newXp, payments: payments });
        const recentPayment = await AllPayments.create({ paymentAmount: payment, paymentDate: paymentDate, username: username })
        res.status(statusCode.OK).json({ paymentProcessed: "true", payment: recentPayment })
    } catch (e) {
        res.status(statusCode.ERROR).json({ paymentProcessed: "false", error: e.message })
    }
}
///////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////// Helpers   ////////////////////////////////////

const loginUser = async (req,res) => {
    const { username, password, pcNumber, sessionType } = req.body;
    const user = await User.findOne({ username });
    if (user === null) {
        res.status(statusCode.ERROR).json({ error: `User with username: ${username} does not exist.` })
        return;
    }
    if(user.isLogedIn===true){
        res.status(statusCode.ERROR).json({error:`User with username: ${username} is already loged in.`})
        return ;
    }
    if (!bcrypt.compareSync(password, user.password)) {
        res.status(statusCode.ERROR).json({ error: `Wrong password.` })
        return;
    }
    const loginDate = Date.now();
    const session = await Session.create({ loginDate: loginDate, logoutDate: undefined, pcNumber: pcNumber, sessionType: sessionType })
    await User.updateOne({ username },
        {
            $set: { isLogedIn: true },
            $push: { sessions: session }
    })
    const accessToken = jwt.sign({user:user})
    memory.logedInUsers.push(user);
    // console.info(memory.logedInUsers);
    // console.info("New user loged in: "+ username);
    res.status(statusCode.OK).json({ user: user,accessToken:accessToken })
}
const logoutUser = async (req,res) => {
    const {username} = req.body;
    const user = await User.findOne({username});
    if(user===null){
        res.status(statusCode.ERROR).json({ error: `User with username: ${username} does not exist.` })
        return;
    }
    if(user.isLogedIn===false){
        res.status(statusCode.ERROR).json({error:`User with username: ${username} is not loged in.`})
        return;
    }
    const lastSession = await getLastSession(username);
    lastSession.logoutDate = Date.now();
    await User.updateOne(
        { username: username, "sessions._id": lastSession._id },
        { $set: { "sessions.$.logoutDate": lastSession.logoutDate,isLogedIn:false } }
    );
    memory.logedInUsers.pop(user);
    // console.info(memory.logedInUsers);
    // console.info("User loged out: "+ username);
    return res.status(statusCode.OK).json({message:`User ${username} logged out.`})
}
const getLastSession = async (username) => {
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error(`User ${username} not found`);
    }
    if (user.sessions.length === 0) {
        throw new Error(`User ${username} has no sessions`);
    }
    const lastSession = user.sessions[user.sessions.length - 1];
    return lastSession;
};
///////////////////////////////////////////////////////////////////////////////////




module.exports = {
    getUsers,
    createUser,
    // authenticateUser,
    payment,
    getUser,
    getUserBalance,
    getUserDiscount,
    getUserXp,
    getUserPayments,
    getUserSessions,
    loginUser,
    logoutUser
}