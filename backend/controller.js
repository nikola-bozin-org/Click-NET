const { User, Session} = require('./schemas')
const bcrypt = require('bcrypt')
const jwt = require('./jwt')
const memory = require('./server-memory')
const statusCode = require('./statusCodes')


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



