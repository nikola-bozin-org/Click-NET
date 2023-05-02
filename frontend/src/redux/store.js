import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import workstationReducer from './workstationsSlice'
import gamesReducer from './gamesSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    workstations:workstationReducer,
    games:gamesReducer,
  },
});

export default store;
