import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';

// Async thunk for getting all cars
export const getAllCars = createAsyncThunk(
  'cars/getAllCars',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get('https://capstonezoomcar-bknd.onrender.com/api/cars/getallcars');
      return response.data;
    } catch (error) {
      message.error('Something went wrong, please try later');
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Async thunk for booking a car
export const bookCar = createAsyncThunk('bookings/bookingCar', async (bookingData, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://capstonezoomcar-bknd.onrender.com/api/bookings/bookingcar', bookingData);
    return response.data;
  } catch (error) {
    // Handle errors and return a rejected value
    message.error('Booking failed! Please try again.');
    return rejectWithValue(error.response.data);
  }
});


// Async thunk for deleting a car
export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async ({ carid }, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      await axios.delete(`https://capstonezoomcar-bknd.onrender.com/api/cars/deletecar/${carid}`);
      message.success('Car deleted successfully');
      dispatch(getAllCars()); // Refresh the car list
    } catch (error) {
      message.error('Something went wrong, please try later');
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Async thunk for adding a car
export const addCar = createAsyncThunk(
  'cars/addCar',
  async (carData, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post('https://capstonezoomcar-bknd.onrender.com/api/cars/addcar', carData);
      message.success('Car added successfully');
      return response.data;
    } catch (error) {
      message.error('Something went wrong, please try later');
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Async thunk for editing a car
export const editCar = createAsyncThunk(
  'cars/editCar',
  async ({ carid, updatedCarData }, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.put(`https://capstonezoomcar-bknd.onrender.com/api/cars/editcar/${carid}`, updatedCarData);
      message.success('Car updated successfully');
      dispatch(getAllCars()); // Refresh the car list after updating
      return response.data;
    } catch (error) {
      message.error('Something went wrong, please try again later');
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Adding the new async thunk to extraReducers
const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.cars = action.payload;
      })
      .addCase(getAllCars.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload); // Add the new car to the state
        state.loading = false;
      })
      .addCase(addCar.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCar.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCar.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex(car => car.id === action.payload.id);
        if (index !== -1) {
          state.cars[index] = action.payload; // Update the car in the state
        }
        state.loading = false;
      })
      .addCase(editCar.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading } = carsSlice.actions;
export default carsSlice.reducer;


// export { getAllCars, deleteCar, bookCar };

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { message } from 'antd';
// // Async thunk for booking a car
// export const bookCar = createAsyncThunk('bookings/bookCar', async (bookingData) => {
//   const response = await axios.post('http://localhost:3001/api/bookings/bookings/bookingcar', bookingData);
//   return response.data;
// });
// // Define your async thunks
// export const getAllCars = createAsyncThunk(
//   'cars/getAllCars',
//   async (_, { dispatch }) => {
//     dispatch(setLoading(true));
//     try {
//       const response = await axios.get('http://localhost:3001/api/cars/getallcars');
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       message.error('Something went wrong, please try later');
//     } finally {
//       dispatch(setLoading(false));
//     }
//   }
// );
// export const addCar = createAsyncThunk(
//   'cars/addCar',
//   async (reqObj, { dispatch }) => {
//     dispatch(setLoading(true));
//     try {
//       await axios.post('https://capstonezoomcar-bknd.onrender.com/api/cars/addcar', reqObj);
//       message.success('New car added successfully');
//       setTimeout(() => {
//         window.location.href = '/admin';
//       }, 500);
//     } catch (error) {
//       console.log(error);
//       message.error('Something went wrong, please try later');
//     } finally {
//       dispatch(setLoading(false));
//     }
//   }
// );

// export const deleteCar = createAsyncThunk(
//   'cars/deleteCar',
//   async (carId, { dispatch }) => {
//     dispatch(setLoading(true));
//     try {
//       await axios.delete(`https://capstonezoomcar-bknd.onrender.com/api/cars/deletecar/${carId}`);
//       message.success('Car deleted successfully');
//       dispatch(getAllCars()); // Refresh the car list
//     } catch (error) {
//       console.log(error);
//       message.error('Something went wrong, please try later');
//     } finally {
//       dispatch(setLoading(false));
//     }
//   }
// );
// export const editCar = createAsyncThunk(
//   'cars/editCar',
//   async (reqObj, { dispatch }) => {
//     dispatch(setLoading(true));
//     try {
//       await axios.put(`https://capstonezoomcar-bknd.onrender.com/api/cars/editcar/${reqObj._id}`, reqObj);
//       message.success('Car details updated successfully');
//       dispatch(getAllCars()); // Refresh the car list
//     } catch (error) {
//       console.log(error);
//       message.error('Something went wrong, please try later');
//     } finally {
//       dispatch(setLoading(false));
//     }
//   }
// );
// export const fetchFilteredCars = createAsyncThunk(
//   'cars/fetchFilteredCars',
//   async ({ category, minBudget, maxBudget }) => {
//     const response = await axios.get('https://capstonezoomcar-bknd.onrender.com/api/cars/search', {
//       params: { category, minBudget, maxBudget }
//     });
//     return response.data;
//   }
// );
// // Define your slice
// const carsSlice = createSlice({
//   name: 'cars',
//   initialState: {
//     cars: [],
//     loading: false,
//   },
//   reducers: {
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllCars.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getAllCars.fulfilled, (state, action) => {
//         state.cars = action.payload;
//       })
//       .addCase(getAllCars.rejected, (state) => {
//         // No need to set loading to false here
//       })
//       .addCase(addCar.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addCar.fulfilled, (state, action) => {
//         state.cars.push(action.payload);
//         // No need to set loading to false here
//       })
//       .addCase(addCar.rejected, (state) => {
//         // No need to set loading to false here
//       })
//       .addCase(deleteCar.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteCar.fulfilled, (state) => {
//       })
//       .addCase(deleteCar.rejected, (state) => {
//       })
//       .addCase(editCar.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(editCar.fulfilled, (state) => {   
//       })
//       .addCase(editCar.rejected, (state) => {
//       })
//       .addCase(fetchFilteredCars.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchFilteredCars.fulfilled, (state, action) => {
//         state.cars = action.payload;
//       })
//       .addCase(fetchFilteredCars.rejected, (state, action) => {
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setLoading } = carsSlice.actions;
// export default carsSlice.reducer;
