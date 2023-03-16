const UserActions = {
    AccountCreation:"Account Created.",
    Login:"Login",
    Logout:"Logout",
    TicketBought:(name,price) =>`Bought ticket ${name}, price: ${price}.`,
    Payment:"Payment",
    Refund:`Refund`
}


module.exports = UserActions;