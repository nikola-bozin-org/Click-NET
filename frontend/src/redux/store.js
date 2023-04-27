import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import workstationReducer from './workstationsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    workstations:workstationReducer,
  },
});

export default store;
