const {
  setConnectedToWebsocket,
  setDisconnectedFromWebsocket,
} = require("./redux/authSlice");

const store = require("./redux/store").default;

let ws;
export const connect = (accessToken) => {
    console.info(accessToken)
    ws = new WebSocket(
    `ws://localhost:${9875}/?jwt=${encodeURIComponent(accessToken)}`
  );
  ws.onopen = () => {
    console.log("Connected to websocket server");
    store.dispatch(setConnectedToWebsocket());
    // sendMessage('a','b','c')

  };
  ws.onmessage = async (message) => {
    console.info(message)
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
