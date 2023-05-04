import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import workstationReducer from './workstationsSlice'
import gamesReducer from './gamesSlice'
import otherReducer from './otherSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    workstations:workstationReducer,
    games:gamesReducer,
    other:otherReducer,
  },
});

export default store;
