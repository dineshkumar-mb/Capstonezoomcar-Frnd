import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';

// Async thunk for user login
// export const userLogin = createAsyncThunk(
//   'user/login',
//   async (reqObj, { rejectWithValue }) => {
//     try {
      
//       const response = await axios.post('http://localhost:3001/api/users/login', reqObj);
//       console.log("response",response)
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       message.success('Login success !');
//       setTimeout(() => {
//         window.location.href = '/';
//       }, 500);
//       console.log(response.data)
//       return response.data;
//     } catch (error) {
//       message.error('Something went wrong');
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const userLogin = createAsyncThunk(
  'auth/login', // Action type
  async (reqObj, { rejectWithValue }) => {
    try {
      // Send POST request to the login API
      const response = await axios.post('https://capstonezoomcar-bknd.onrender.com/api/users/login', reqObj);
      
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Show success message
      message.success('Login success!');

      // Return the user data (which includes the role)
      return response.data; // Assuming this contains { token, user: { username, role } }
    } catch (error) {
      // Show error message
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
    isAdmin: false, // New field to track if the user is an admin
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
