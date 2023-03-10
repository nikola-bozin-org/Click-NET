const { User, UserSession} = require('../schemas')
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

const logoutUser = async(req,res)=>{
    res.send("LOGEDOUT")
}


module.exports={
    loginUser,logoutUser
}