const WebSocket = require("ws");
require('dotenv').config();
const axios = require('axios');
const url = require('url');

const ratePerHour = 180;
const ratePerMinute = ratePerHour / 60 + 10;
const ratePerSecond = ratePerMinute / 60;
const customRate = 2000;

const extractUserFromToken = async (token) => {
  try {
    const response = await axios.get(`${process.env.API_BASE_URL_PRODUCTION}/session/verifyToken`, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
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
const logoutUser = async (token) => {
  try {
    const response = await axios.post(`${process.env.API_BASE_URL_LOCAL}/session/logout`,{}, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
        'secret': process.env.SERVER_SECRET,
      },
    })
    console.info(response.data)
  } catch (e) {
    console.info(e.response.data.error)
  }
}



const startServer = async () => {
  const server = new WebSocket.Server({ port: process.env.PORT }, () => {
    console.info(`Listening on: localhost:${process.env.PORT}`);
  });

  server.on("connection", async (ws, req) => {
    const queryParams = new URLSearchParams(url.parse(req.url).search);
    const token = queryParams.get('jwt');
    const extractedUser = await extractUserFromToken(token);
    if (!extractedUser) { ws.send(JSON.stringify({ event: "invalidToken", message: "Invalid token!" })); ws.close(); return; }
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
    ws.on('close', async () => {
      console.info('Client disconnected');
      logoutUser(token)
    })
  });

}


startServer();