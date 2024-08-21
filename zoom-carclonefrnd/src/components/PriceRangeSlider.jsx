// import React, { useState, useEffect } from 'react';
// import { Slider, TextField, Stack, Typography } from '@mui/material';

// const PriceRangeSlider = ({ data, onFilter }) => {
//   const [RentPerHourRange, setRentPerHourRange] = useState([1500, 15000]);

//   useEffect(() => {
//     // Filter data based on RentPerHour range
//     const filteredData = data.filter(car => car.RentPerHour >= RentPerHourRange[0] && car.RentPerHour <= RentPerHourRange[1]);
//     onFilter(filteredData);
//   }, [RentPerHourRange, data, onFilter]);

//   const handleRentPerHourChange = (event, newValue) => {
//     setRentPerHourRange(newValue);
//   };

//   return (
//     <div className="sliderContainer">
//       <style>
//         {`
//           .sliderContainer {
//             padding: 20px;
//             background-color: #f9f9f9;
//             border-radius: 8px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             margin-bottom: 20px;
//           }
//           .slider {
//             margin-bottom: 20px;
//           }
//           .textFieldsContainer {
//             display: flex;
//             justify-content: space-evenly;
//             align-items: center;
//           }
//           .textField {
//             width: 100px;
//           }
//         `}
//       </style>
//       <Slider
//         value={RentPerHourRange}
//         onChange={handleRentPerHourChange}
//         valueLabelDisplay="auto"
//         min={1500}
//         max={15000}
//         className="slider"
//       />
//       <Stack direction="row" justifyContent="space-evenly" alignItems="center" className="textFieldsContainer">
//         <TextField
//           label="Min"
//           type="number"
//           value={RentPerHourRange[0]}
//           onChange={(e) => setRentPerHourRange([Number(e.target.value), RentPerHourRange[1]])}
//           className="textField"
//         />
//         <Typography>-</Typography>
//         <TextField
//           label="Max"
//           type="number"
//           value={RentPerHourRange[1]}
//           onChange={(e) => setRentPerHourRange([RentPerHourRange[0], Number(e.target.value)])}
//           className="textField"
//         />
//       </Stack>
//     </div>
//   );
// };

// export default PriceRangeSlider;
import React, { useState, useEffect } from 'react';
import { Slider, TextField, Stack, Typography, Box } from '@mui/material';

const PriceRangeSlider = ({ data, onFilter }) => {
  const [RentPerHourRange, setRentPerHourRange] = useState([1500, 15000]);
  const [CapacityRange, setCapacityRange] = useState([4, 9]);

  useEffect(() => {
    const filteredData = data.filter(
      (car) =>
        car.RentPerHour >= RentPerHourRange[0] &&
        car.RentPerHour <= RentPerHourRange[1] &&
        car.Capacity >= CapacityRange[0] &&
        car.Capacity <= CapacityRange[1]
    );
    onFilter(filteredData);
  }, [RentPerHourRange, CapacityRange, data, onFilter]);

  const handleRentPerHourChange = (event, newValue) => {
    setRentPerHourRange(newValue);
  };

  const handleCapacityChange = (event, newValue) => {
    setCapacityRange(newValue);
  };

  return (
    <Box
      className="sidebarContainer"
      sx={{
        padding: 2,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 1,
        width: '100%',
        position: { xs: 'static', sm: 'sticky' }, // Static on small screens, sticky on larger
        top: 20,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: { xs: 'auto', sm: 'calc(100vh - 40px)' }, // Adjusted for small screens
        overflowY: { xs: 'visible', sm: 'auto' }, // Scrollable on larger screens
        mb: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>Filter By</Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontSize: '0.9rem', mb: 1 }}>Rent Per Hour</Typography>
        <Slider
          value={RentPerHourRange}
          onChange={handleRentPerHourChange}
          valueLabelDisplay="auto"
          min={1500}
          max={15000}
          sx={{ mb: 2 }}
        />
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <TextField
            label="Min"
            type="number"
            value={RentPerHourRange[0]}
            onChange={(e) => setRentPerHourRange([Number(e.target.value), RentPerHourRange[1]])}
            sx={{ width: '48%' }}
            size="small"
          />
          <TextField
            label="Max"
            type="number"
            value={RentPerHourRange[1]}
            onChange={(e) => setRentPerHourRange([RentPerHourRange[0], Number(e.target.value)])}
            sx={{ width: '48%' }}
            size="small"
          />
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ fontSize: '0.9rem', mb: 1 }}>Capacity</Typography>
        <Slider
          value={CapacityRange}
          onChange={handleCapacityChange}
          valueLabelDisplay="auto"
          min={4}
          max={9}
          sx={{ mb: 2 }}
        />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <TextField
            label="Min"
            type="number"
            value={CapacityRange[0]}
            onChange={(e) => setCapacityRange([Number(e.target.value), CapacityRange[1]])}
            sx={{ width: '48%' }}
            size="small"
          />
          <TextField
            label="Max"
            type="number"
            value={CapacityRange[1]}
            onChange={(e) => setCapacityRange([CapacityRange[0], Number(e.target.value)])}
            sx={{ width: '48%' }}
            size="small"
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default PriceRangeSlider;
