const { User, Session} = require('./schemas')
const bcrypt = require('bcrypt')
const jwt = require('./jwt')
const memory = require('./server-memory')
const {getUsers,getUser,createUser,getUserBalance,getUserDiscount,getUserXp,getUserPayments,getUserSessions} = require('./controllers/userController');
const {addLevel,updateLevelXP} = require('./controllers/levelsController')
const {createTicket} = require('./controllers/ticketsController')
const statusCode = require('./statusCodes')
const {loginUser,logoutUser} = require('./controllers/sessionController')


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

    console.info("TODO");
    // try {
    //     payments.push({ paymentAmount: payment, paymentDate: paymentDate })
    //     await User.updateOne({ username }, { balance: newBalance, xp: newXp, payments: payments });
    //     const recentPayment = await AllPayments.create({ paymentAmount: payment, paymentDate: paymentDate, username: username })
    //     res.status(statusCode.OK).json({ paymentProcessed: "true", payment: recentPayment })
    // } catch (e) {
    //     res.status(statusCode.ERROR).json({ paymentProcessed: "false", error: e.message })
    // }
}
///////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////// Helpers   ////////////////////////////////////

// const loginUser = async (req,res) => {
//     const { username, password, pcNumber, sessionType } = req.body;
//     const user = await User.findOne({ username });
//     if (user === null) {
//         res.status(statusCode.ERROR).json({ error: `User with username: ${username} does not exist.` })
//         return;
//     }
//     if(user.isLogedIn===true){
//         res.status(statusCode.ERROR).json({error:`User with username: ${username} is already loged in.`})
//         return ;
//     }
//     if (!bcrypt.compareSync(password, user.password)) {
//         res.status(statusCode.ERROR).json({ error: `Wrong password.` })
//         return;
//     }
//     const loginDate = Date.now();
//     const session = await Session.create({ loginDate: loginDate, logoutDate: undefined, pcNumber: pcNumber, sessionType: sessionType })
//     await User.updateOne({ username },
//         {
//             $set: { isLogedIn: true },
//             $push: { sessions: session }
//     })
//     const accessToken = jwt.sign({user:user})
//     memory.onUserLoggedIn(user);
//     res.status(statusCode.OK).json({ user: user,accessToken:accessToken })
// }
// const logoutUser = async (req,res) => {
//     const {username} = req.body;
//     const user = await User.findOne({username});
//     if(user===null){
//         res.status(statusCode.ERROR).json({ error: `User with username: ${username} does not exist.` })
//         return;
//     }
//     if(user.isLogedIn===false){
//         res.status(statusCode.ERROR).json({error:`User with username: ${username} is not loged in.`})
//         return;
//     }
//     const lastSession = await getLastSession(username);
//     lastSession.logoutDate = Date.now();
//     await User.updateOne(
//         { username: username, "sessions._id": lastSession._id },
//         { $set: { "sessions.$.logoutDate": lastSession.logoutDate,isLogedIn:false } }
//     );
//     memory.onUserLoggedOut.pop(user);

//     return res.status(statusCode.OK).json({message:`User ${username} logged out.`})
// }
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

module.exports = {
    getUsers,
    createUser,
    getUser,
    getUserBalance,
    getUserDiscount,
    getUserXp,
    getUserPayments,
    getUserSessions,
    
    payment,
    loginUser,
    logoutUser,


    addLevel,
    updateLevelXP,



    createTicket,
}