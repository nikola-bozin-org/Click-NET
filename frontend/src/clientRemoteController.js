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
    console.log("Connected to websocket server");
    store.dispatch(setConnectedToWebsocket());
    // sendMessage('a','b','c')
  };
  ws.onmessage = async (message) => {
    const parsedMessage = JSON.parse(message.data);
    const parsedMessageEvent = parsedMessage.event;
    if(parsedMessageEvent==='newConnection'){
      try{
        const result = await fetchConnectedClients();
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
