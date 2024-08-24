
import { Col, Row, Divider, DatePicker, Checkbox, message } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import DefaultLayout from "../components/Defaultlayout";
import Spinner from "../components/Spinner";
import { getAllCars, bookCar } from "../features/carsSlice"; 
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import 'aos/dist/aos.css'; 
import '../index.css';

const { RangePicker } = DatePicker;

function BookingCar() {
  const navigate = useNavigate();
  const { carid } = useParams();
  const { cars, loading } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const [car, setCar] = useState({});
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === carid));
    }
  }, [cars, dispatch, carid]);

  useEffect(() => {
    setTotalAmount(totalHours * car.RentPerHour);
    if (driver) {
      setTotalAmount((prevAmount) => prevAmount + 30 * totalHours);
    }
  }, [driver, totalHours, car.RentPerHour]);

  function selectTimeSlots(values) {
    const selectedFrom = values[0];
    const selectedTo = values[1];
    const currentTime = moment();

    // Check if the selected dates are in the past
    if (selectedFrom.isBefore(currentTime) || selectedTo.isBefore(currentTime)) {
      message.error("You cannot book a car for a past date.");
      setFrom(null);
      setTo(null);
      setTotalHours(0);
    } else {
      setFrom(selectedFrom.format("MMM DD YYYY HH:mm"));
      setTo(selectedTo.format("MMM DD YYYY HH:mm"));
      setTotalHours(selectedTo.diff(selectedFrom, "hours"));
    }
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: { from, to },
    };

    dispatch(bookCar(reqObj))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          navigate("/userbookings");
        }
      })
      .catch((error) => {
        console.error('Error during booking:', error);
      });
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" align="middle" style={{ minHeight: "90vh", padding: '0 16px' }}>
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img 
            src={car.Imageurl} 
            className="carimg2 bs1 w-100" 
            style={{ width: '90%', height: 'auto' }} 
            data-aos='flip-left' 
            data-aos-duration='1500' 
            alt={car.Carname}
          />
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>Car Info</Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.Carname}</p>
            <p>{car.RentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.FuelType}</p>
            <p>Max Persons : {car.Capacity}</p>
          </div>
          <Divider type="horizontal" dashed>Select Time Slots</Divider>
          <RangePicker 
            showTime={{ format: "HH:mm" }} 
            format="MMM DD YYYY HH:mm" 
            onChange={selectTimeSlots} 
            style={{ width: '100%' }} 
          />
          <br />
          {from && to && (
            <div>
              <p>Total Hours : <b>{totalHours}</b></p>
              <p>Rent Per Hour : <b>{car.RentPerHour}</b></p>
              <Checkbox onChange={(e) => setDriver(e.target.checked)}>Driver Required</Checkbox>
              <h3>Total Amount : {totalAmount}</h3>
              <StripeCheckout
                shippingAddress
                token={onToken}
                currency="INR"
                amount={totalAmount * 100}
                stripeKey="pk_test_51PfEQKIGMXT0myEMc0tW6LWBF03XGIQRKqP2cQeAdCq9sa3W4lDKcM9tGTJsYnzUa1tLIdMzQCc4NE4fP0v9XYPl00ZI4k9wkt"
              >
                <button className="btn1">Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;

// import { Col, Row, Divider, DatePicker, Checkbox } from "antd";
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import DefaultLayout from "../components/Defaultlayout";
// import Spinner from "../components/Spinner";
// import { getAllCars, bookCar } from "../features/carsSlice"; 
// import moment from "moment";
// import StripeCheckout from "react-stripe-checkout";
// import 'aos/dist/aos.css'; 
// import '../index.css'; // Import your custom styles

// const { RangePicker } = DatePicker;

// function BookingCar() {
//   const navigate = useNavigate();
//   const { carid } = useParams();
//   const { cars, loading } = useSelector((state) => state.cars);
//   const dispatch = useDispatch();
//   const [car, setCar] = useState({});
//   const [from, setFrom] = useState();
//   const [to, setTo] = useState();
//   const [totalHours, setTotalHours] = useState(0);
//   const [driver, setDriver] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     if (cars.length === 0) {
//       dispatch(getAllCars());
//     } else {
//       setCar(cars.find((o) => o._id === carid));
//     }
//   }, [cars, dispatch, carid]);

//   useEffect(() => {
//     setTotalAmount(totalHours * car.RentPerHour);
//     if (driver) {
//       setTotalAmount(prevAmount => prevAmount + 30 * totalHours);
//     }
//   }, [driver, totalHours, car.RentPerHour]);

//   function selectTimeSlots(values) {
//     setFrom(moment(values[0]).format("MMM DD YYYY HH:mm"));
//     setTo(moment(values[1]).format("MMM DD YYYY HH:mm"));
//     setTotalHours(values[1].diff(values[0], "hours"));
//   }

//   function onToken(token) {
//     const reqObj = {
//       token,
//       user: JSON.parse(localStorage.getItem("user"))._id,
//       car: car._id,
//       totalHours,
//       totalAmount,
//       driverRequired: driver,
//       bookedTimeSlots: { from, to },
//     };

//     dispatch(bookCar(reqObj))
//       .then((response) => {
//         if (response.meta.requestStatus === 'fulfilled') {
//           navigate("/userbookings");
//         }
//       })
//       .catch((error) => {
//         console.error('Error during booking:', error);
//       });
//   }

//   return (
//     <DefaultLayout>
//       {loading && <Spinner />}
//       <Row justify="center" align="middle" style={{ minHeight: "90vh", padding: '0 16px' }}>
//         <Col lg={10} sm={24} xs={24} className='p-3'>
//           <img 
//             src={car.Imageurl} 
//             className="carimg2 bs1 w-100" 
//             style={{ width: '90%', height: 'auto' }} 
//             data-aos='flip-left' 
//             data-aos-duration='1500' 
//             alt={car.Carname}
//           />
//         </Col>
//         <Col lg={10} sm={24} xs={24} className="text-right">
//           <Divider type="horizontal" dashed>Car Info</Divider>
//           <div style={{ textAlign: "right" }}>
//             <p>{car.Carname}</p>
//             <p>{car.RentPerHour} Rent Per hour /-</p>
//             <p>Fuel Type : {car.FuelType}</p>
//             <p>Max Persons : {car.Capacity}</p>
//           </div>
//           <Divider type="horizontal" dashed>Select Time Slots</Divider>
//           <RangePicker showTime={{ format: "HH:mm" }} format="MMM DD YYYY HH:mm" onChange={selectTimeSlots} style={{ width: '100%' }} />
//           <br />
//           {from && to && (
//             <div>
//               <p>Total Hours : <b>{totalHours}</b></p>
//               <p>Rent Per Hour : <b>{car.RentPerHour}</b></p>
//               <Checkbox onChange={(e) => setDriver(e.target.checked)}>Driver Required</Checkbox>
//               <h3>Total Amount : {totalAmount}</h3>
//               <StripeCheckout
//                 shippingAddress
//                 token={onToken}
//                 currency="INR"
//                 amount={totalAmount * 100}
//                 stripeKey="pk_test_51PfEQKIGMXT0myEMc0tW6LWBF03XGIQRKqP2cQeAdCq9sa3W4lDKcM9tGTJsYnzUa1tLIdMzQCc4NE4fP0v9XYPl00ZI4k9wkt"
//               >
//                 <button className="btn1">Book Now</button>
//               </StripeCheckout>
//             </div>
//           )}
//         </Col>
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default BookingCar;


