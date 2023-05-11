const WebSocket = require("ws");
require('dotenv').config();
const {ratePerHour,ratePerMinute,ratePerSecond,customRate,clients,staffClients} = require('./server-storage')
const { extractUserFromToken, logoutUser, sendMessageToClient, grabAccessToken, informStaffAboutNewConnection, storeConnection, setUsetBalance } = require("./utils");
const { startHttpServer } = require("./server-helper");
const BalanceManager = require('./balanceManager')

const startServer = async () => {
  const server = new WebSocket.Server({ port: process.env.PORT }, () => {
    console.info(`WS: Listening on: localhost:${process.env.PORT}`);
  });

  server.on("connection", async (ws, req) => {
    const token = grabAccessToken(req);
    const extractedUser = await extractUserFromToken(token);
    if (!extractedUser) { ws.send(JSON.stringify({ event: "invalidToken", message: "Invalid token!" })); ws.close(); return; }
    const username = extractedUser.username;
    const clientRole = extractedUser.role;
    let clientBalance = extractedUser.balance;
    const balanceManager = new BalanceManager(clientBalance);
    storeConnection(clientRole,ws,extractedUser);
    ws.send(JSON.stringify({event:"entryAllowed"}))
    informStaffAboutNewConnection();
    
    ws.on("message",(message)=>{
      try {
        const data = JSON.parse(message);
        if (data.event === "sendMessage_Staff" && data.recipientUsername && data.message) {
          if(extractedUser.role === 'Admin' || extractedUser.role==='Employee')
          sendMessageToClient(username, data.recipientUsername, data.message);
        } else {
          console.error("Invalid message format or missing data");
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    })


    const updateClient = () => {
      // console.info(balanceManager.balance);
      if(clientRole==='Admin' || clientRole==='Employee'){return}
      if ( extractedUser.discount === 100) {return}
      clientBalance -= ratePerSecond;

      //ovo bolje...odradi.. ne mora stalno da se pita za tiket
      if (clientBalance > 0 || extractedUser.activeTickets.length > 0) {
        ws.send(JSON.stringify({ event: "balance", data: { balance: clientBalance } }));
        return;
      }

      ws.send(JSON.stringify({ event: "timeUp", message: "Time is up." }));
      ws.close();
    };

    const interval = setInterval(updateClient, 1000);
    ws.on('close', async () => {
      clients.delete(username);
      staffClients.delete(username);
      logoutUser(token)
      setUsetBalance(token,clientBalance)
      clearInterval(interval);
    })
  });

}

startServer();
startHttpServer();