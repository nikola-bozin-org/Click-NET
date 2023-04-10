const WebSocket = require("ws");
require('dotenv').config();

const server = new WebSocket.Server({ port: process.env.PORT }, () => {
  console.info(`Listening on: localhost:${process.env.PORT}`);
});

server.on("connection", (ws) => {
  console.log("Client connected");

  ws.send("Hello");

  ws.on("message", (message) => {
    console.log("Received message:", message.toString("utf8"));
  });
});