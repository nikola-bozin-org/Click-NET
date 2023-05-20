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
    console.info(extractedUser)
    let clientBalance = extractedUser.balance;
    const username = extractedUser.username;

    ws.on("message",async(message)=>{
      try {
        const data = JSON.parse(message);
        if(data.event==="refill"){
          if(extractedUser.role === 'Admin' || extractedUser.role==='Employee' && data.amount && data.username){
            if(clients.get(data.username)){
              console.info('client logged in')
              console.info(clientBalance)
            }else{
              const balance = parseInt(await getUserBalance(data.username));
              await setUserBalance(token,data.username,balance+ parseInt(data.amount),()=>{console.info('succes update balance')},()=>{console.info('FUCKED UP')})
            }
            // if(clients.get(data.username))
            // clients.get(data.username).clientManager.refill(data.amount,()=>{});
            // else{setUserBalance(token,)}
        } //else if (data.event === "remoteControl" && data.recipientUsername && data.message) {
          //   if(extractedUser.role === 'Admin' || extractedUser.role==='Employee')
          //   sendMessageToClient(clientManager.getUsername(), data.recipientUsername, data.message);
          // } else if(data.event==="buyTicket"){
          // console.info(data.ticket);
        // }
        

        }else{
          console.error("Invalid message format or missing data");
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    })

    if(extractedUser.role==='Admin' || extractedUser.role==='Employee'){return}
    if(extractedUser.discount === 100) {return}
    const interval = setInterval(()=>{
      clientBalance -= 0.5;
      if (clientBalance > 0) {
        ws.send(
          JSON.stringify({ event: "balance", data: { balance: clientBalance } })
        );
        return;
      }
      clientBalance = 0;
      ws.send(JSON.stringify({ event: "timeUp", message: "Time is up." }));
      ws.close();
    }, 1000);

    ws.on('close', async () => {
      clients.delete(username);
      staffClients.delete(username);
       logoutUser(token)
       //TODO: this will throw error if on server we have to check if its Admin or Employee, because token is of User!
       setUserBalance(token,username,clientBalance,()=>{},()=>{})
      if(interval)clearInterval(interval);
    })
  });

}

startServer();
startHttpServer();