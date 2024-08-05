// redefine code 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';
// Async thunk for fetching all bookings
export const getAllBookings = createAsyncThunk('bookings/getAllBookings', async () => {
  const response = await axios.get('https://capstonezoomcar-bknd.onrender.com/api/bookings/getallbookings');
  return response.data;
});

// Async thunk for booking a car
export const bookCar = createAsyncThunk('bookings/bookCar', async (bookingData) => {
  const response = await axios.post('https://capstonezoomcar-bknd.onrender.com/api/bookings/bookings/bookingcar', bookingData);
  return response.data;
});

// Async thunk for editing a booking
export const updateBooking = createAsyncThunk('bookings/updateBooking', async ({ id, bookingData }) => {
  const response = await axios.put(`https://capstonezoomcar-bknd.onrender.com/api/bookings/bookings/${id}`, bookingData);
  return response.data;
});

// Async thunk for deleting a booking
export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id) => {
  await axios.delete(`https://capstonezoomcar-bknd.onrender.com/api/bookings/delete/${id}`);
  return id;
});

// Async thunk for fetching all cars (if needed, otherwise can be removed)
export const getAllCars = createAsyncThunk('cars/getAllCars', async (_, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get('https://capstonezoomcar-bknd.onrender.com/api/bookings/userbookings');
    return response.data;
  } catch (error) {
    console.log(error);
    message.error('Something went wrong, please try later');
  } finally {
    dispatch(setLoading(false));
  }
});

const initialState = {
  bookings: [],
  bookcar: [],
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
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
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex((booking) => booking._id === action.payload._id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((booking) => booking._id !== action.payload);
      });
  },
});

export const { setLoading } = bookingsSlice.actions;

export default bookingsSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk for fetching all bookings
// export const getAllBookings = createAsyncThunk('bookings/getAllBookings', async () => {
//   const response = await axios.get('https://capstonezoomcar-bknd.onrender.com/api/bookings/getallbookings');
//   return response.data;
// });

// // Async thunk for booking a car
// export const bookCar = createAsyncThunk('bookings/bookingCar', async (bookingData) => {
//   const response = await axios.post('https://capstonezoomcar-bknd.onrender.com/api/bookings/bookings/bookingcar', bookingData);
//   console.log(bookingData)
//   return response.data;
// });

// // Async thunk for editing a car
// export const editbookCar = createAsyncThunk('bookings/editBooking', async ({ id, bookingData }) => {
//   const response = await axios.put(`https://capstonezoomcar-bknd.onrender.com/api/bookings/bookings/${id}`, bookingData);

//   return response.data;
// });
// // delete booking
// export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async ({ id, bookingData }) => {
//   const response = await axios.delete(`https://capstonezoomcar-bknd.onrender.com/api/bookings/deleteBooking/${id}`,bookingData);
//   return response.data;
// });

// // Define your async thunks
// export const getAllCars = createAsyncThunk(
//   'cars/getAllBookings',
//   async (_, { dispatch }) => {
//     dispatch(setLoading(true));
//     try {
//       const response = await axios.get('https://capstonezoomcar-bknd.onrender.com/api/bookings/bookings/userbookings');
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       message.error('Something went wrong, please try later');
//     } finally {
//       dispatch(setLoading(false));
//     }
//   }
// );


// const initialState = {
//   bookings: [],
//   bookcar: [],
//   loading: false,
//   error: null,
// };

// const bookingsSlice = createSlice({
//   name: 'bookings',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllBookings.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getAllBookings.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bookings = action.payload;
//       })
//       .addCase(getAllBookings.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(bookCar.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(bookCar.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bookcar = action.payload;
//       })
//       .addCase(bookCar.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default bookingsSlice.reducer;
