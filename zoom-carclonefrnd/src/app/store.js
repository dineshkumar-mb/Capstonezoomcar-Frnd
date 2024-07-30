import { configureStore } from '@reduxjs/toolkit';
import alertsReducer from '../features/alertsSlice';
import bookingReducer from '../features/bookingSlice';
import carsReducer from '../features/carsSlice';
import authReducer from '../features/authSlice';
import registerReducer from '../features/registerSlice';
const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    cars: carsReducer,
    bookings: bookingReducer,
    auth: authReducer,
    register:registerReducer,
    
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
