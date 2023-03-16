const UserActionDescription = {
    AccountCreation:(creator,username)=> `Staff <${creator}> created new user: <${username}>`,
    Login:`Login`,
    Logout:`Logout`,
    TicketBought:`Ticket Bought`,
    Payment:`User Cash Payment`
}


module.exports=UserActionDescription;