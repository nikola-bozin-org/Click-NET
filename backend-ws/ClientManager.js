const { storeConnection, informStaffAboutNewConnection, setUserBalance } = require("./utils");

class ClientManager {
  constructor(client, ws,token) {
    this.client = client;
    this.ws = ws;
    this.token=token;
    this.zone = this.client.zone; //NULL for now?
    this.balance = client.balance; //dynamic
    this.tickets = client.tickets; //NULL for now? 


  }
  refill = async(amount,onComplete) => {
    console.info(`CURRENT: ${this.balance} TO REFILL: ${amount}`)
    this.balance += amount;
    await setUserBalance(this.token,this.balance,()=>{})
    console.info(`NEW ${this.balance}`)
    onComplete()
  };
}
module.exports = ClientManager;
