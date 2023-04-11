const WebSocket = require("ws");
require('dotenv').config();
const mongoConnect = require('./mongo-connect')
const axios = require('axios');

const startServer = async () => {
  mongoConnect.connect(mongoConnect.connectionLink, () => {
    const server = new WebSocket.Server({ port: process.env.PORT }, () => {
      console.info(`Listening on: localhost:${process.env.PORT}`);
    });

    server.on("connection", (ws) => {
      console.log(`Client connected:`);

      ws.on("message", async (message) => {
        try {
          const response = await axios.get('http://localhost:9876/api/session/verifyToken', {
            headers: {
              'Content-Type': 'application/json',
              'token': message,
              'secret':'secret-password-ce-018'
            },
          });
          if(response.data.error){
            console.error(response.data.error);
            ws.close(); return;
          }
          console.log(response.data);
        } catch (e) {
          ws.close();
          console.error('Error: ', e);
        }
        
      });
    });

  })
}


startServer();