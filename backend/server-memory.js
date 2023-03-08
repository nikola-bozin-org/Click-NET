const logedInUsers = [];


const onUserLoggedIn = (user)=>{
    logedInUsers.push(user);
}
const onUserLoggedOut = (user)=>{
    logedInUsers.pop(user);
}

module.exports={
    onUserLoggedIn,
    onUserLoggedOut
}