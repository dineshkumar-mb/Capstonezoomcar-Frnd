import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';

// Async thunk for user login
export const userLogin = createAsyncThunk(
  'user/login',
  async (reqObj, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://capstonezoomcar-bknd.onrender.com/api/users/login', reqObj);
      localStorage.setItem('user', JSON.stringify(response.data));
      message.success('Login success');
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      return response.data;
    } catch (error) {
      message.error('Something went wrong');
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user registration
export const userRegister = createAsyncThunk(
  'user/register',
  async (reqObj, { rejectWithValue }) => {
    try {
     
      const response = await axios.post('https://capstonezoomcar-bknd.onrender.com/api/users/register', reqObj);
      message.success('Registration successful');
      setTimeout(() => {
        window.location.href = '/login';
      }, 500);
      return response.data;
    } catch (error) {
      message.error('Something went wrong');
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice for user authentication
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
