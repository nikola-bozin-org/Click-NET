const UserActionDescription = {
    AccountCreation:(creator,username)=> `Staff ${creator} created new user: ${username}.`,
    Login:(rate)=>`Login: ${rate}/hour.`,
    Logout:`Logout.`,
    LogoutByStaff:(staff)=>`Logout by ${staff}.`,
    TicketBought:`Ticket Bought.`,
    Payment:`User Cash Payment.`
}


module.exports=UserActionDescription;