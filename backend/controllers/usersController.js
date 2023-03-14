const {User} = require('../schemas')
const bcrypt = require('bcrypt')
const statusCode = require('../statusCodes')
const jwt = require('../jwt')


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
    const token = req.headers.token;
    if(!token) return res.status(statusCode.UNAUTHORIZED).json({error:'unauthorized'});
    const verifyResult = jwt.verify(token);
    console.info(verifyResult);
    if(verifyResult.role!=="Admin" && verifyResult.role!=="Employee") return res.status(statusCode.ERROR).json({error:'you are not Admin or Employee'});
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
              role:"Default",
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


module.exports = {
    getUsers,
    getUser,
    createUser
}