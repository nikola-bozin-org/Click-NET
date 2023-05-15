import { fetchConnectedClients } from "./utils";

const {setConnectedToWebsocket,setDisconnectedFromWebsocket} = require("./redux/authSlice");
const {onWorkstationOnline,onWorkstationOffline, addWorkstationRole} = require("./redux/workstationsSlice")
const store = require("./redux/store").default;

let ws;
export const connect = (accessToken) => {
    ws = new WebSocket(
    `ws://localhost:${9875}/?jwt=${encodeURIComponent(accessToken)}`
  );
  ws.onopen = () => {
    store.dispatch(setConnectedToWebsocket());
  };
  ws.onmessage = async (message) => {
    const parsedMessage = JSON.parse(message.data);
    const parsedMessageEvent = parsedMessage.event;
    if(parsedMessageEvent==='newConnection'){
      try{
        const result = await fetchConnectedClients();
        console.info(result)
        console.info('ovo je array. zajebo sise . zato ne r adi')
        console.error('ne treba da ovo uradi ako je admin ili employe... doduse...vidi server kako to treba da uradi, jer ipak moze da se loguje tamo')
        if(result.length===0) return;
        store.dispatch(onWorkstationOnline());
        store.dispatch(addWorkstationRole({number:result.pcNumber,role:result.role}))
      }catch(e){
        console.info(e);
      }
    }
  };
};
export const disconnect = () => {
  if (!ws) return "Unable to disconnect. (Not Connected to Websocket)";
  ws.close();
  store.dispatch(setDisconnectedFromWebsocket());
  console.log("Disconnected from server");
};
export const sendMessage = (from, to, message) => {
  if (!ws) return "Unable to disconnect. (Not Connected to Websocket)";
  ws.send("Hello");
};
export const sendRefillEvent = (username, amount) => {
  if (!ws) {
    console.log("Unable to send message. (Not Connected to WebSocket)");
    return;
  }

  const refillEvent = {
    event: "refill",
    username: username,
    amount: amount
  };

  ws.send(JSON.stringify(refillEvent));
};