const WebSocket = require("ws");
require('dotenv').config();

const ws = new WebSocket(`ws://localhost:${process.env.PORT}/?jwt=${encodeURIComponent('jwt_token')}`);


ws.on("open", () => {
    console.log("Connected to server");
});

ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString("utf-8"));
    const parsedMessageEvent = parsedMessage.event;
    if (parsedMessageEvent === 'userData') {
       return console.log('Received user data event from server:', parsedMessage.data);
    }else if(parsedMessageEvent === "timeUp"){
       return console.log('Received time up event from server:', parsedMessage.message);
    }else if(parsedMessageEvent === "invalidToken"){
        return console.log('Received invalid Token event from server:', parsedMessage.message);
     }
});
