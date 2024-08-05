import React, { useState, useEffect } from 'react';
import { Slider, TextField, Stack, Typography } from '@mui/material';

const PriceRangeSlider = ({ data, onFilter }) => {
  const [RentPerHourRange, setRentPerHourRange] = useState([1500, 15000]);

  useEffect(() => {
    // Filter data based on RentPerHour range
    const filteredData = data.filter(car => car.RentPerHour >= RentPerHourRange[0] && car.RentPerHour <= RentPerHourRange[1]);
    onFilter(filteredData);
  }, [RentPerHourRange, data, onFilter]);

  const handleRentPerHourChange = (event, newValue) => {
    setRentPerHourRange(newValue);
  };

  return (
    <div className="sliderContainer">
      <style>
        {`
          .sliderContainer {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }
          .slider {
            margin-bottom: 20px;
          }
          .textFieldsContainer {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
          }
          .textField {
            width: 100px;
          }
        `}
      </style>
      <Slider
        value={RentPerHourRange}
        onChange={handleRentPerHourChange}
        valueLabelDisplay="auto"
        min={1500}
        max={15000}
        className="slider"
      />
      <Stack direction="row" justifyContent="space-evenly" alignItems="center" className="textFieldsContainer">
        <TextField
          label="Min"
          type="number"
          value={RentPerHourRange[0]}
          onChange={(e) => setRentPerHourRange([Number(e.target.value), RentPerHourRange[1]])}
          className="textField"
        />
        <Typography>-</Typography>
        <TextField
          label="Max"
          type="number"
          value={RentPerHourRange[1]}
          onChange={(e) => setRentPerHourRange([RentPerHourRange[0], Number(e.target.value)])}
          className="textField"
        />
      </Stack>
    </div>
  );
};

export default PriceRangeSlider;
