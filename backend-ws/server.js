const WebSocket = require("ws");
require('dotenv').config();
const url = require('url');
const { extractUserFromToken, logoutUser } = require("./utils");

const ratePerHour = 180;
const ratePerMinute = ratePerHour / 60 + 10;
const ratePerSecond = ratePerMinute / 60;
const customRate = 2000;

const clients = new Map();

const startServer = async () => {
  const server = new WebSocket.Server({ port: process.env.PORT }, () => {
    console.info(`Listening on: localhost:${process.env.PORT}`);
  });

  server.on("connection", async (ws, req) => {
    const queryParams = new URLSearchParams(url.parse(req.url).search);
    const token = queryParams.get('jwt');
    const extractedUser = await extractUserFromToken(token);
    if (!extractedUser) { ws.send(JSON.stringify({ event: "invalidToken", message: "Invalid token!" })); ws.close(); return; }
    const username = extractedUser.username;
    clients.set(username,ws);
    let clientBalance = extractedUser.balance;
    const clientTickets = extractedUser.activeTickets;
    const clientDiscount = extractedUser.discount;
    
    ws.on("message",(message)=>{
      try {
        const data = JSON.parse(message);
        if (data.event === "sendMessage" && data.recipientUsername && data.message) {
          sendMessageToClient(username, data.recipientUsername, data.message);
        } else {
          console.error("Invalid message format or missing data");
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    })

    
    const updateClient = () => {
      if (clientDiscount === 100) {
        return;
      }
      clientBalance -= ratePerMinute;
      // Update the database

      //ovo bolje...odradi.. ne mora stalno da se pita za tiket
      if (clientBalance > 0 || clientTickets.length > 0) {
        // Update the database
        ws.send(JSON.stringify({ event: "balance", data: { balance: clientBalance } }));
        return;
      }

      ws.send(JSON.stringify({ event: "timeUp", message: "Time is up." }));
      ws.close();
    };

    setInterval(updateClient, 1000);
    ws.on('close', async () => {
      console.info('Client disconnected');
      clients.delete(username);
      logoutUser(token)
    })
  });

}


startServer();