const WebSocket = require("ws");
require('dotenv').config();

const ws = new WebSocket(`ws://localhost:${process.env.PORT}/?jwt=${encodeURIComponent('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjgxMDMyMDg1fQ.UDfyGTqRvklBnRPmybpbEtaXGjoPX-SIkklZwK--NX4')}`);


ws.on("open", () => {
    console.log("Connected to server");
});

ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString("utf-8"));
    if (parsedMessage.event === 'userData') {
       return console.log('Received custom event from server:', parsedMessage.data);
    }
    console.info("Message: " + message.toString("utf-8"))
});


ws.on("close",() => {
});
