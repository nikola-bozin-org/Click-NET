const { setConnectedToWebsocket, setDisconnectedFromWebsocket } = require('./redux/authSlice');

const store = require('./redux/store').default;


let ws;
const connect = (accessToken)=>{
    ws = new WebSocket(`ws://localhost:${9875}/?jwt=${encodeURIComponent(accessToken)}`)
    ws.onopen = () => {
        console.log("Connected to websocket server");
        store.dispatch(setConnectedToWebsocket())
    };
    ws.onmessage = async(message) =>{

    }
}

const disconnect =()=>{
    if(ws){
        ws.close();
        store.dispatch(setDisconnectedFromWebsocket())
        console.log("Disconnected from server");
    }
}

module.exports={
    connect,
    disconnect
}