const WebSocket = require("ws");
require('dotenv').config();
const {clients,staffClients} = require('./server-storage')
const { extractUserFromToken, logoutUser, sendMessageToClient, grabAccessToken, setUserBalance, storeConnection, informStaffAboutNewConnection, getUserBalance } = require("./utils");
const { startHttpServer } = require("./server-helper");

const startServer = async () => {
  const server = new WebSocket.Server({ port: process.env.PORT }, () => {
    console.info(`WS: Listening on: localhost:${process.env.PORT}`);
  });

  server.on("connection", async (ws, req) => {
    const token = grabAccessToken(req);
    const extractedUser = await extractUserFromToken(token);
    if (!extractedUser) { ws.send(JSON.stringify({ event: "invalidToken", message: "Invalid token!" })); ws.close(); return; }
    storeConnection(ws,extractedUser);
    ws.send(JSON.stringify({event:"entryAllowed"}))
    informStaffAboutNewConnection();
    const username = extractedUser.username;

    ws.on("message",async(message)=>{
      try {
        const data = JSON.parse(message);
        if(data.event==="refill"){
          if(extractedUser.role === 'Admin' || extractedUser.role==='Employee' && data.amount && data.username){
            if(clients.get(data.username)){
              const user = clients.get(data.username).user;
              const currentUserBalance =user.balance;
              const newUserBalance =currentUserBalance+parseInt(data.amount);
              setUserBalance(token,data.username,newUserBalance,()=>{user.balance = newUserBalance},()=>{})
            }else{
              const balance = parseInt(await getUserBalance(data.username));
              setUserBalance(token,data.username,balance+ parseInt(data.amount),()=>{},()=>{})
            }
        }
         //else if (data.event === "remoteControl" && data.recipientUsername && data.message) {
          //   if(extractedUser.role === 'Admin' || extractedUser.role==='Employee')
          //   sendMessageToClient(clientManager.getUsername(), data.recipientUsername, data.message);
          // } else if(data.event==="buyTicket"){
          // console.info(data.ticket);
        // }
        

        }else if(data.event==="buyTicket"){
          console.info(data.ticket)
        }
        else{
          console.error("Invalid message format or missing data");
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    })

    if(extractedUser.role==='Admin' || extractedUser.role==='Employee'){return}
    if(extractedUser.discount === 100) {return}
    const interval = setInterval(() => {
      const user = clients.get(username).user;
      user.balance -= 0.5;
    
      if (user.balance > 0) {
        ws.send(JSON.stringify({ event: "balance", data: { balance: user.balance } }));
        return;
      }
    
      user.balance = 0;
      ws.send(JSON.stringify({ event: "timeUp", message: "Time is up." }));
      ws.close();
    }, 1000);

    ws.on('close', async () => {
      setUserBalance(token,username,clients.get(username).user.balance,()=>{},()=>{})
      clients.delete(username);
      staffClients.delete(username);
       logoutUser(token)
       //TODO: this will throw error if on server we have to check if its Admin or Employee, because token is of User!
      if(interval)clearInterval(interval);
    })
  });

}

startServer();
startHttpServer();