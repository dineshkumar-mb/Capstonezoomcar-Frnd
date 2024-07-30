// features/alertsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = alertsSlice.actions;
export default alertsSlice.reducer;
