const WebSocket = require("ws");
require('dotenv').config();
const axios = require('axios');
const url = require('url');

const ratePerHour = 180;
const ratePerMinute = ratePerHour/60 + 10;
const ratePerSecond = ratePerMinute/60;
const customRate = 2000;

const extractUserFromToken = async (req) => {
  try {
    const queryParams = new URLSearchParams(url.parse(req.url).search);
    const response = await axios.get(process.env.API_BASE_URL_PRODUCTION, {
      headers: {
        'Content-Type': 'application/json',
        'token': queryParams.get('jwt'),
        'secret': process.env.SERVER_SECRET,
      },
    });

    if (response.data.isValid) return response.data.verifyResult;
    return false;
  } catch (error) {
    console.error('Error extracting user from token:', error.code);
    return false;
  }
};



const startServer = async () => {
    const server = new WebSocket.Server({ port: process.env.PORT }, () => {
      console.info(`Listening on: localhost:${process.env.PORT}`);
    });

    server.on("connection", async (ws, req) => {
      const extractedUser = await extractUserFromToken(req);
      if(!extractedUser) {ws.send(JSON.stringify({event:"invalidToken",message: "Invalid token!"})); ws.close(); return; }
      let clientBalance = extractedUser.balance;
      const clientTickets = extractedUser.activeTickets;
      const clientDiscount = extractedUser.discount;
      
      const updateClient = () => {
        clientBalance -= ratePerMinute;
        // Update the database
        if (clientDiscount === 100) {
          return;
        }
       //ovo bolje...odradi.. ne mora stalno da se pita za tiket
        if (clientBalance > 0 || clientTickets.length > 0) {
          ws.send(JSON.stringify({ event: "balance", data: { balance: clientBalance } }));
          return;
        }
      
        ws.send(JSON.stringify({ event: "timeUp", message: "Time is up." }));
        ws.close();
        // Update the database
        ws.send(JSON.stringify({ event: "balance", data: { balance: clientBalance } }));
      };

      setInterval(updateClient, 1000);
    });
    server.on('close',async(ws)=>{
      console.info('Client disconnected');
    })
}


startServer();