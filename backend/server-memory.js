const logedInUsers = [];

console.info("validni tokeni? user kad se izloguje treba da nije vise validan")

const onUserLoggedIn = (user)=>{
    logedInUsers.push(user);
}
const onUserLoggedOut = (user)=>{
    logedInUsers.splice(logedInUsers.indexOf(user),1);
}
const getLoggedInUsersCount = ()=>{
    return logedInUsers.length;
}
const getLoggedInUsers = () =>{
    return logedInUsers;
}

module.exports={
    onUserLoggedIn,
    onUserLoggedOut,
    getLoggedInUsers,
    getLoggedInUsersCount
}