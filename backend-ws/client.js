const WebSocket = require("ws");
require('dotenv').config();

const ws = new WebSocket(`ws://localhost:${process.env.PORT}`);


ws.on("open", () => {
    console.log("Connected to server");
  
    ws.send(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjgxMDMyMDg1fQ.UDfyGTqRvklBnRPmybpbEtaXGjoPX-SIkklZwK--NX4`);
});

ws.on("message", (message) => {
    console.info(message.toString("utf-8"))
});



ws.on("close",() => {
});