const WebSocket = require("ws");
require('dotenv').config();

const ws = new WebSocket(`ws://localhost:${process.env.PORT}/?jwt=${encodeURIComponent('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImMiLCJyb2xlIjoiRGVmYXVsdCIsInBjTnVtYmVyIjoxMSwiYWN0aXZlVGlja2V0cyI6W10sImJhbGFuY2UiOjMwNDQsImxhc3RTZXNzaW9uSWQiOiI2NDNkNmJkMTdiYWY0MzMxOWE2MDFmM2QiLCJkaXNjb3VudCI6MCwiaWF0IjoxNjgxNzQ2ODk3fQ.6IX55uMgndvEY9ZD0Iczi-c-TI4eWUxqJ8OzxQLUgg8')}`);


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
