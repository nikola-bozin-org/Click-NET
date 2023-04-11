const WebSocket = require("ws");
require('dotenv').config();
const mongoConnect = require('./mongo-connect')
const axios = require('axios');
const url = require('url');

const startServer = async () => {
  mongoConnect.connect(mongoConnect.connectionLink, () => {
    const server = new WebSocket.Server({ port: process.env.PORT }, () => {
      console.info(`Listening on: localhost:${process.env.PORT}`);
    });

    server.on("connection", async (ws, req) => {
      console.log(`Client connected:`);
      const queryParams = new URLSearchParams(url.parse(req.url).search);
      const jwt = queryParams.get('jwt');
      const response = await axios.get('http://localhost:9876/api/session/verifyToken', {
        headers: {
          'Content-Type': 'application/json',
          'token': jwt,
          'secret': 'secret-password-ce-018'
        },
      });
      if (response.data.error) {
        console.error(response.data.error);
        ws.close(); return;
      }
      //token is valid here
      console.log(response.data);
      let clientNumber = 0;
      const sendCurrentTime = () => {
        ws.send(clientNumber);
        clientNumber++;
      };
      const intervalId = setInterval(sendCurrentTime, 1000);
    });
  });
}


startServer();