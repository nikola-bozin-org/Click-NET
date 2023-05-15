const WebSocket = require("ws");
require('dotenv').config();
const {clients,staffClients} = require('./server-storage')
const { extractUserFromToken, logoutUser, sendMessageToClient, grabAccessToken, setUserBalance } = require("./utils");
const { startHttpServer } = require("./server-helper");
const ClientManager = require('./ClientManager')

const startServer = async () => {
  const server = new WebSocket.Server({ port: process.env.PORT }, () => {
    console.info(`WS: Listening on: localhost:${process.env.PORT}`);
  });

  server.on("connection", async (ws, req) => {
    const token = grabAccessToken(req);
    const extractedUser = await extractUserFromToken(token);
    if (!extractedUser) { ws.send(JSON.stringify({ event: "invalidToken", message: "Invalid token!" })); ws.close(); return; }
    const clientManager = new ClientManager(extractedUser,ws,token);
    if(clientManager.getRole()==='Admin' || clientManager.getRole()==='Employee'){return}
    if ( extractedUser.discount === 100) {return}
    const interval = setInterval(clientManager.updateClient, 1000);

    
    ws.on("message",(message)=>{
      try {
        const data = JSON.parse(message);
        if (data.event === "remoteControl" && data.recipientUsername && data.message) {
          if(extractedUser.role === 'Admin' || extractedUser.role==='Employee')
          sendMessageToClient(clientManager.getUsername(), data.recipientUsername, data.message);
        } else if(data.event==="buyTicket"){

        } else if(data.event==="refill"){
          if(extractedUser.role === 'Admin' || extractedUser.role==='Employee' && data.amount && data.username){
            clients.get(username).clientManager.refill(data.amount);
          }

        }else{
          console.error("Invalid message format or missing data");
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    })


    
    ws.on('close', async () => {
      clients.delete(clientManager.getUsername());
      staffClients.delete(clientManager.getUsername());
      logoutUser(token)
      setUserBalance(token,clientManager.balance)
      clearInterval(interval);
    })
  });

}

startServer();
startHttpServer();