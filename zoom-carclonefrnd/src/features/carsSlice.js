import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';

// Define your async thunks
export const getAllCars = createAsyncThunk(
  'cars/getAllCars',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get('http://localhost:3001/api/cars/getallcars');
      return response.data;
    } catch (error) {
      console.log(error);
      message.error('Something went wrong, please try later');
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addCar = createAsyncThunk(
  'cars/addCar',
  async (reqObj, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      await axios.post('http://localhost:3001/api/cars/addcar', reqObj);
      message.success('New car added successfully');
      // setTimeout(() => {
      //   window.location.href = '/admin';
      // }, 500);
    } catch (error) {
      console.log(error);
      message.error('Something went wrong, please try later');
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async (carId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      await axios.delete(`http://localhost:3001/api/cars/deletecar/${carId}`);
      message.success('Car deleted successfully');
      dispatch(getAllCars()); // Refresh the car list
    } catch (error) {
      console.log(error);
      message.error('Something went wrong, please try later');
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const editCar = createAsyncThunk(
  'cars/editCar',
  async (reqObj, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      await axios.put(`http://localhost:3001/api/cars/editcar/${reqObj._id}`, reqObj);
      message.success('Car details updated successfully');
      dispatch(getAllCars()); // Refresh the car list
    } catch (error) {
      console.log(error);
      message.error('Something went wrong, please try later');
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Define your slice
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
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(getAllCars.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars.push(action.payload);
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
      .addCase(editCar.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCar.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export the actions and reducer
export const { setLoading } = carsSlice.actions;
export default carsSlice.reducer;
