import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAdmin: false,
    isConnectedToWebSocket:false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        state.isAdmin = action.payload.isAdmin;
      },
      logout: (state) => {
        state.isAdmin = false;
      },
      setConnectedToWebsocket:(state)=>{
        state.isConnectedToWebSocket=true;
      },
      setDisconnectedFromWebsocket:(state)=>{
        state.isConnectedToWebSocket=false;
      }
    },
  });
  
  export const { login, logout,setConnectedToWebsocket,setDisconnectedFromWebsocket } = authSlice.actions;
  export default authSlice.reducer;
  