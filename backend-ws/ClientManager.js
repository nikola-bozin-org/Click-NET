const { storeConnection, informStaffAboutNewConnection, setUsetBalance } = require("./utils");

class ClientManager {
  constructor(client, ws,token) {
    this.client = client;
    this.ws = ws;
    this.token=token;
    this.zone = this.client.zone;
    this.balance = client.balance; //dynamic
    this.tickets = client.tickets; 

    storeConnection(this.client.role,ws,this.client,this);
    this.ws.send(JSON.stringify({event:"entryAllowed"}))
    informStaffAboutNewConnection();
  }
  refill = (amount) => {
    this.balance += amount;
    setUsetBalance(this.token,this.balance)
  };
  updateClient = () => {
    this.balance -= 0.5;
    if (this.balance > 0) {
      this.ws.send(
        JSON.stringify({ event: "balance", data: { balance: this.balance } })
      );
      return;
    }
    this.balance = 0;
    this.ws.send(JSON.stringify({ event: "timeUp", message: "Time is up." }));
    this.ws.close();
  };




  getUsername = () =>{
    return this.client.username;
  }
  getBalance = ()=>{
    return this.balance;
  }
  getRole = ()=>{
    return this.client.role;
  }
}
module.exports = ClientManager;
