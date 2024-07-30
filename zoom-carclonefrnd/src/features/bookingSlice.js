
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching all bookings
export const getAllBookings = createAsyncThunk('bookings/getAllBookings', async () => {
  const response = await axios.get('http://localhost:3001/api/bookings/getallbookings');
  return response.data;
});

// Async thunk for booking a car
export const bookCar = createAsyncThunk('bookings/bookingCar', async (bookingData) => {
  const response = await axios.post('http://localhost:3001/api/bookings/bookings/bookingcar', bookingData);
  console.log(bookingData)
  return response.data;
});
// Define your async thunks
export const getAllCars = createAsyncThunk(
  'cars/getAllBookings',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get('http://localhost:3001/api/bookings/bookings/userbookings');
      return response.data;
    } catch (error) {
      console.log(error);
      message.error('Something went wrong, please try later');
    } finally {
      dispatch(setLoading(false));
    }
  }
);


const initialState = {
  bookings: [],
  bookcar: [],
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(bookCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookCar.fulfilled, (state, action) => {
        state.loading = false;
        state.bookcar = action.payload;
      })
      .addCase(bookCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookingsSlice.reducer;
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   bookings: [],
//   bookcar:[],
// };

// const bookingsSlice = createSlice({
//   name: 'bookings',
//   initialState,
//   reducers: {
//     getAllBookings(state, action) {
//       state.bookings = action.payload;
//     },
//     bookcar(state,action){
//       state.bookcar =action.payload;
//     }
//   },
// });

// export const { getAllBookings,bookCar } = bookingsSlice.actions;
// export default bookingsSlice.reducer;