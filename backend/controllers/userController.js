const {User} = require('../schemas')
const bcrypt = require('bcrypt')
const statusCode = require('../statusCodes')

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
    // const token = req.headers.token;
    // if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:'unauthorized'});
    // const admin = jwt.verify(token);
    // if(admin.role!==0 && admin.role!==2) return res.status(statusCode.ERROR).json({error:'you are not Admin or Employee'});
    const { username, password, firstName, lastName, email, phone } = req.body;
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
    // console.info(user.payments);
    console.info(user);
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


module.exports = {
    getUsers,
    getUser,
    createUser,
    getUserBalance,
    getUserDiscount,
    getUserXp,
    getUserPayments,
    getUserSessions,
}