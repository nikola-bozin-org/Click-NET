const WebSocket = require("ws");
require('dotenv').config();
const mongoConnect = require('./mongo-connect')
const axios = require('axios');
const url = require('url');


const extractUserFromToken = async(req)=>{
  const queryParams = new URLSearchParams(url.parse(req.url).search);
  const response = await axios.get('http://localhost:9876/api/session/verifyToken', {
    headers: {
      'Content-Type': 'application/json',
      'token': queryParams.get('jwt'),
      'secret': 'secret-password-ce-018'
    },
  });
  if(response.data.isValid) return response.data.verifyResult;
  return false;
}


const startServer = async () => {
  mongoConnect.connect(mongoConnect.connectionLink, () => {
    const server = new WebSocket.Server({ port: process.env.PORT }, () => {
      console.info(`Listening on: localhost:${process.env.PORT}`);
    });

    server.on("connection", async (ws, req) => {
      const extractedUser = await extractUserFromToken(req);
      if(!extractedUser) {ws.send("Invalid token!"); ws.close(); return; }

      let clientNumber = 0;
      const updateClient = () => {
        ws.send(JSON.stringify({event:"userData",data:extractedUser}))
        clientNumber++;
      };
      const intervalId = setInterval(updateClient, 1000);
    });
  });
}


startServer();