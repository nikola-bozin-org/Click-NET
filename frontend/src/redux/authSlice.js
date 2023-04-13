import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAdmin: false,
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
    },
  });
  
  export const { login, logout } = authSlice.actions;
  export default authSlice.reducer;
  