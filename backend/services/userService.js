const {User} = require('../schemas')

const _getUserBalance = async (username)=>{
    try{
        const user = await User.findOne({ username });
        if (user === null) return res.status(statusCode.ERROR).json({ error: `User ${username} not found.` });
        return { balance: user.balance };
    }catch(e){
        return {error:e.message}
    }
}
const _getUserDiscount = async(username)=>{
    try{
        const user = await User.findOne({ username });
        if (user === null) return { error: `User ${username} not found.`};
        return { discount: user.discount };
    }catch(e){
        return {error:e.message}
    }
}

const _getUserXp = async(username)=>{
    try{
        const user = await User.findOne({ username });
        if (user === null) return { error: `User ${username} not found.` };
        return { xp: user.xp };
    }catch(e){
        return {error:e.message}
    }
}


const _getUserRole = async (username) => {
    try {
        const user = await User.findOne({ username });
        if (user === null) return { error: `User ${username} not found.` };
        return { role: user.role };
    } catch (e) {
        return { error: e.message };
    }
};

const _getUserBasicInfo = async (username) => {
    try {
        const user = await User.findOne({ username });
        if (user === null) return { error: `User ${username} not found.` };
        return { basicInfo: user.basicInfo };
    } catch (e) {
        return { error: e.message };
    }
};

const _getUserActions = async (username) => {
    try {
        const user = await User.findOne({ username });
        if (user === null) return { error: `User ${username} not found.` };
        return { actions: user.actions };
    } catch (e) {
        return { error: e.message };
    }
};

const _getUserTickets = async (username) => {
    try {
        const user = await User.findOne({ username });
        if (user === null) return { error: `User ${username} not found.`};
        return {tickets:user.activeTickets};
    }catch(e){
        return { error: e.message };
    }
}


const _getUserPayments = async (username) => {
    try {
        const user = await User.findOne({ username }).populate('payments');
        if (user === null) return { error: `User ${username} not found.`};
        return {payments:user.payments};
    }catch(e){
        return { error: e.message };
    }
}



module.exports={
    _getUserBalance,
    _getUserDiscount,
    _getUserXp,
    _getUserRole,
    _getUserBasicInfo,
    _getUserActions,
    _getUserTickets,
    _getUserPayments
}