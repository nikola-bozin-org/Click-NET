const WebSocket = require("ws");
require('dotenv').config();
const mongoConnect = require('./mongo-connect')
const axios = require('axios');
const url = require('url');

const ratePerHour = 180;
const ratePerMinute = ratePerHour/60;
const ratePerSecond = ratePerMinute/60;
const customRate = 2000;

const extractUserFromToken = async (req) => {
  try {
    const queryParams = new URLSearchParams(url.parse(req.url).search);
    const response = await axios.get(process.env.API_BASE_URL_LOCAL, {
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
  mongoConnect.connect(mongoConnect.connectionLink, () => {
    const server = new WebSocket.Server({ port: process.env.PORT }, () => {
      console.info(`Listening on: localhost:${process.env.PORT}`);
    });

    server.on("connection", async (ws, req) => {
      const extractedUser = await extractUserFromToken(req);
      if(!extractedUser) {ws.send(JSON.stringify({event:"invalidToken",message: "Invalid token!"})); ws.close(); return; }
      let clientBalance = extractedUser.balance;
      const clientTickets = extractedUser.activeTickets;
      
      const updateClient = () => {
        clientBalance-=ratePerMinute;
        //updejt u bazu
        if(clientBalance<=0 && clientTickets.length===0) {
          ws.send(JSON.stringify({ event: "timeUp", message: "Time is up." }));
          ws.close();
          //updejt u bazu
        } 
        ws.send(JSON.stringify({event:"userData",data:{balance:clientBalance}}))
      };
      setInterval(updateClient, 1000);
    });
  });
}


startServer();