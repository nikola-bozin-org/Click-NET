require('dotenv').config()
const {User, UserSession} = require('../schemas')
const bcrypt = require('bcrypt')
const jwt = require('../jwt')
const memory = require('../server-memory')
const statusCode = require('../statusCodes')



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
    const session = await UserSession.create({ loginDate: loginDate, logoutDate: undefined, pcNumber: pcNumber, sessionType: sessionType })
    const sessionId = session.id;
    console.info(sessionId);
    await User.updateOne({ username },
        {
            $set: { isLogedIn: true },
            $push: { sessions: session }
    })
    const accessToken = jwt.sign({user:user})
    memory.onUserLoggedIn(user);
    res.status(statusCode.OK).json({ user: user,accessToken:accessToken })
}
const logoutUser = async (req,res) => {
    console.info("samo uzer ili admin")
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
    memory.onUserLoggedOut(user);

    return res.status(statusCode.OK).json({message:`User ${username} logged out.`})
}
const getLoggedInUsers = async(req,res)=>{
    res.status(statusCode.OK).json({logedInUsers:memory.getLoggedInUsers()})
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


module.exports={
    loginUser,logoutUser,getLoggedInUsers
}