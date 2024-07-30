import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  // Add other properties as needed
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Add other reducers as needed
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
