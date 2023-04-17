const WebSocket = require("ws");
require('dotenv').config();
const mongoConnect = require('./mongo-connect')
const axios = require('axios');
const url = require('url');


const extractUserFromToken = async(req)=>{
  const queryParams = new URLSearchParams(url.parse(req.url).search);
  const response = await axios.get(process.env.API_BASE_URL_LOCAL, {
    headers: {
      'Content-Type': 'application/json',
      'token': queryParams.get('jwt'),
      'secret': process.env.SERVER_SECRET
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

      const updateClient = () => {
        ws.send(JSON.stringify({event:"userData",data:extractedUser}))
      };
      const intervalId = setInterval(updateClient, 1000);
    });
  });
}


startServer();