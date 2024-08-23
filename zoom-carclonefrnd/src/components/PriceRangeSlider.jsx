//added reset button
import React, { useState, useEffect } from 'react';
import { Slider, TextField, Stack, Typography, Box, Button } from '@mui/material';

const PriceRangeSlider = ({ data, onFilter }) => {
  // Initial ranges for RentPerHour and Capacity
  const initialRentPerHourRange = [1500, 15000];
  const initialCapacityRange = [4, 9];

  const [RentPerHourRange, setRentPerHourRange] = useState(initialRentPerHourRange);
  const [CapacityRange, setCapacityRange] = useState(initialCapacityRange);

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

  // Reset function to restore initial values
  const handleReset = () => {
    setRentPerHourRange(initialRentPerHourRange);
    setCapacityRange(initialCapacityRange);
  };

  return (
    <Box
      className="sidebarContainer"
      sx={{
        padding: 3,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: 3,
        width: '97%',
        position: { xs: 'static', sm: 'sticky' },
        top: 20,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: { xs: 'auto', sm: 'calc(100vh - 40px)' },
        overflowY: { xs: 'visible', sm: 'auto' },
        mb: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontSize: '1.25rem', mb: 2, fontWeight: 'bold' }}>Filter By</Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontSize: '1rem', mb: 1 }}>Rent Per Hour</Typography>
        <Slider
          value={RentPerHourRange}
          onChange={handleRentPerHourChange}
          valueLabelDisplay="auto"
          min={1500}
          max={15000}
          sx={{
            color: '#007bff',
            height: 8,
            '& .MuiSlider-thumb': {
              height: 24,
              width: 24,
              backgroundColor: '#fff',
              border: '2px solid currentColor',
              '&:hover': {
                boxShadow: 'inherit',
              },
            },
            '& .MuiSlider-track': {
              height: 8,
            },
            '& .MuiSlider-rail': {
              height: 8,
              backgroundColor: '#e0e0e0',
            },
          }}
        />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <TextField
            label="Min"
            type="number"
            value={RentPerHourRange[0]}
            onChange={(e) => setRentPerHourRange([Number(e.target.value), RentPerHourRange[1]])}
            sx={{ width: '48%' }}
            size="small"
            variant="outlined"
          />
          <TextField
            label="Max"
            type="number"
            value={RentPerHourRange[1]}
            onChange={(e) => setRentPerHourRange([RentPerHourRange[0], Number(e.target.value)])}
            sx={{ width: '48%' }}
            size="small"
            variant="outlined"
          />
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle1" sx={{ fontSize: '1rem', mb: 1 }}>Capacity</Typography>
        <Slider
          value={CapacityRange}
          onChange={handleCapacityChange}
          valueLabelDisplay="auto"
          min={4}
          max={9}
          sx={{
            color: '#007bff',
            height: 8,
            '& .MuiSlider-thumb': {
              height: 24,
              width: 24,
              backgroundColor: '#fff',
              border: '2px solid currentColor',
              '&:hover': {
                boxShadow: 'inherit',
              },
            },
            '& .MuiSlider-track': {
              height: 8,
            },
            '& .MuiSlider-rail': {
              height: 8,
              backgroundColor: '#e0e0e0',
            },
          }}
        />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <TextField
            label="Min"
            type="number"
            value={CapacityRange[0]}
            onChange={(e) => setCapacityRange([Number(e.target.value), CapacityRange[1]])}
            sx={{ width: '48%' }}
            size="small"
            variant="outlined"
          />
          <TextField
            label="Max"
            type="number"
            value={CapacityRange[1]}
            onChange={(e) => setCapacityRange([CapacityRange[0], Number(e.target.value)])}
            sx={{ width: '48%' }}
            size="small"
            variant="outlined"
          />
        </Stack>
      </Box>

      {/* Reset Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleReset} 
        sx={{ mt: 3 }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default PriceRangeSlider;


// import React, { useState, useEffect } from 'react';
// import { Slider, TextField, Stack, Typography, Box } from '@mui/material';

// const PriceRangeSlider = ({ data, onFilter }) => {
//   const [RentPerHourRange, setRentPerHourRange] = useState([1500, 15000]);
//   const [CapacityRange, setCapacityRange] = useState([4, 9]);

//   useEffect(() => {
//     const filteredData = data.filter(
//       (car) =>
//         car.RentPerHour >= RentPerHourRange[0] &&
//         car.RentPerHour <= RentPerHourRange[1] &&
//         car.Capacity >= CapacityRange[0] &&
//         car.Capacity <= CapacityRange[1]
//     );
//     onFilter(filteredData);
//   }, [RentPerHourRange, CapacityRange, data, onFilter]);

//   const handleRentPerHourChange = (event, newValue) => {
//     setRentPerHourRange(newValue);
//   };

//   const handleCapacityChange = (event, newValue) => {
//     setCapacityRange(newValue);
//   };

//   return (
//     <Box
//       className="sidebarContainer"
//       sx={{
//         padding: 2,
//         backgroundColor: '#f9f9f9',
//         borderRadius: 2,
//         boxShadow: 1,
//         width: '100%',
//         position: { xs: 'static', sm: 'sticky' }, // Static on small screens, sticky on larger
//         top: 20,
//         zIndex: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         maxHeight: { xs: 'auto', sm: 'calc(100vh - 40px)' }, // Adjusted for small screens
//         overflowY: { xs: 'visible', sm: 'auto' }, // Scrollable on larger screens
//         mb: 2,
//       }}
//     >
//       <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>Filter By</Typography>

//       <Box sx={{ mb: 2 }}>
//         <Typography variant="subtitle2" sx={{ fontSize: '0.9rem', mb: 1 }}>Rent Per Hour</Typography>
//         <Slider
//           value={RentPerHourRange}
//           onChange={handleRentPerHourChange}
//           valueLabelDisplay="auto"
//           min={1500}
//           max={15000}
//           sx={{ mb: 2 }}
//         />
//         <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
//           <TextField
//             label="Min"
//             type="number"
//             value={RentPerHourRange[0]}
//             onChange={(e) => setRentPerHourRange([Number(e.target.value), RentPerHourRange[1]])}
//             sx={{ width: '48%' }}
//             size="small"
//           />
//           <TextField
//             label="Max"
//             type="number"
//             value={RentPerHourRange[1]}
//             onChange={(e) => setRentPerHourRange([RentPerHourRange[0], Number(e.target.value)])}
//             sx={{ width: '48%' }}
//             size="small"
//           />
//         </Stack>
//       </Box>

//       <Box>
//         <Typography variant="subtitle2" sx={{ fontSize: '0.9rem', mb: 1 }}>Capacity</Typography>
//         <Slider
//           value={CapacityRange}
//           onChange={handleCapacityChange}
//           valueLabelDisplay="auto"
//           min={4}
//           max={9}
//           sx={{ mb: 2 }}
//         />
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <TextField
//             label="Min"
//             type="number"
//             value={CapacityRange[0]}
//             onChange={(e) => setCapacityRange([Number(e.target.value), CapacityRange[1]])}
//             sx={{ width: '48%' }}
//             size="small"
//           />
//           <TextField
//             label="Max"
//             type="number"
//             value={CapacityRange[1]}
//             onChange={(e) => setCapacityRange([CapacityRange[0], Number(e.target.value)])}
//             sx={{ width: '48%' }}
//             size="small"
//           />
//         </Stack>
//       </Box>
//     </Box>
//   );
// };

// export default PriceRangeSlider;