

import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/Defaultlayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../features/carsSlice";
import moment from "moment";
import { bookCar } from "../features/bookingSlice";
import StripeCheckout from "react-stripe-checkout";
import 'aos/dist/aos.css'; // You can also use <link> for styles

const { RangePicker } = DatePicker;

function BookingCar() {
  const { carid } = useParams();
  const { cars } = useSelector((state) => state.cars);
  const { loading } = useSelector((state) => state.alerts);
  const [car, setCar] = useState({});
  const { bookings, error } = useSelector((state) => state.bookings);

  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const bookSelectedSlot = () => {
    if (selectedSlot) {
      // Call your booking function here (e.g., handleBookCar)
      handleBookCar({
        // Include relevant data (e.g., selectedSlot, car ID, user info)
        // ...
      });
      // Close the modal after booking
      setShowModal(false);
    } else {
      // Show an error message (e.g., "Please select a time slot")
      console.error('Please select a time slot.');
    }
  };
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
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours, car.RentPerHour]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD YYYY HH:mm"));
    setTo(moment(values[1]).format("MMM DD YYYY HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function onToken(token) {
    console.log("token",token)
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: { from, to },
    };
    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" className="d-flex align-items-center" style={{ minHeight: "90vh" }}>
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img src={car.Imageurl} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500' />
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
          <RangePicker showTime={{ format: "HH:mm" }} format="MMM DD YYYY HH:mm" onChange={selectTimeSlots} />
          <br />
          {/* <button className="btn1 mt-2" onClick={() => { setShowModal(true); }}>See Booked Slots</button> */}
          {from && to && (
            <div>
              <p>Total Hours : <b>{totalHours}</b></p>
              <p>Rent Per Hour : <b>{car.RentPerHour}</b></p>
              <Checkbox onChange={(e) => { setDriver(e.target.checked); }}>Driver Required</Checkbox>
              <h3>Total Amount : {totalAmount}</h3>
              <StripeCheckout
  shippingAddress
  token={onToken}
  currency="INR" // Use "INR" for Indian Rupees
  amount={totalAmount * 100}
  stripeKey="pk_test_51PfEQKIGMXT0myEMc0tW6LWBF03XGIQRKqP2cQeAdCq9sa3W4lDKcM9tGTJsYnzUa1tLIdMzQCc4NE4fP0v9XYPl00ZI4k9wkt"
>
  <button className="btn1">Book Now</button>
</StripeCheckout>

            </div>
          )}
        </Col>
        {car.name && (
  //         <Modal visible={showModal} closable={false} footer={false} title="Booked time slots">
  //           <div className="p-2">
  //             {car.bookedTimeSlots.map((slot) => (
  //               <button className="btn1 mt-2" key={slot.from}>{slot.from} - {slot.to}</button>
  //             ))}
  //             <div className="text-right mt-5">
  //               <button className="btn1" onClick={() => { setShowModal(false); }}>CLOSE</button>
  //             </div>
  //           </div>
  //           <div>
  //   <h1>Bookings</h1>
  //   <ul>
  //     {bookings.map((booking) => (
  //       <li key={booking.id}>{booking.car.name}</li>
  //     ))}
  //   </ul>
    
  //   <button onClick={() => handleBookCar({ /* booking data */ })}>Book Car</button>
  // </div>
  //         </Modal>
  <Modal visible={showModal} closable={false} footer={false} title="Booked time slots">
  <div className="p-2">
    {car.bookedTimeSlots.map((slot) => (
      <button
        className="btn1 mt-2"
        key={slot.from}
        onClick={() => setSelectedSlot(slot)} // Set the selected slot
      >
        {slot.from} - {slot.to}
      </button>
    ))}
    <div className="text-right mt-5">
      <button className="btn1" onClick={() => setShowModal(false)}>
        CLOSE
      </button>
      <button className="btn1 ml-2" onClick={bookSelectedSlot}>
        BOOK NOW
      </button>
    </div>
  </div>
  <div>
        <h1>Bookings</h1>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>{booking.car.name}</li>
          ))}
        </ul>

        {/* Button to trigger booking form */}
        <button onClick={() => setShowModal(true)}>Book Car</button>
      </div>
</Modal>


        )};
        
      </Row>
    </DefaultLayout>
  );
}
// Your main component (e.g., Booking
  


export default BookingCar;



// import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import DefaultLayout from "../components/Defaultlayout";
// import Spinner from "../components/Spinner";
// import { getAllCars } from "../features/carsSlice";
// import moment from "moment";
// import { bookCar } from "../features/bookingSlice";
// import StripeCheckout from "react-stripe-checkout";
// import 'aos/dist/aos.css'; // You can also use <link> for styles

// const { RangePicker } = DatePicker;

// function BookingCar() {
//   const { carid } = useParams();
//   const { cars } = useSelector((state) => state.cars);
//   const { loading } = useSelector((state) => state.alerts);
//   const [car, setCar] = useState({});
//   const dispatch = useDispatch();
//   const [from, setFrom] = useState();
//   const [to, setTo] = useState();
//   const [totalHours, setTotalHours] = useState(0);
//   const [driver, setDriver] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     if (cars.length === 0) {
//       dispatch(getAllCars());
//     } else {
//       setCar(cars.find((o) => o._id === carid));
//     }
//   }, [cars, dispatch, carid]);

//   useEffect(() => {
//     setTotalAmount(totalHours * car.rentPerHour);
//     if (driver) {
//       setTotalAmount(totalAmount + 30 * totalHours);
//     }
//   }, [driver, totalHours, car.rentPerHour, totalAmount]);

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
//     dispatch(bookCar(reqObj));
//   }

//   return (
//     <DefaultLayout>
//       {loading && <Spinner />}
//       <Row justify="center" className="d-flex align-items-center" style={{ minHeight: "90vh" }}>
//         <Col lg={10} sm={24} xs={24} className='p-3'>
//           <img src={car.Imageurl} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500' />
//         </Col>
//         <Col lg={10} sm={24} xs={24} className="text-right">
//           <Divider type="horizontal" dashed>Car Info</Divider>
//           <div style={{ textAlign: "right" }}>
//             <p>{car.Carname
//             }</p>
//             <p>{car.RentPerHour} Rent Per hour /-</p>
//             <p>Fuel Type : {car.FuelType}</p>
//             <p>Max Persons : {car.Capacity}</p>
//           </div>
//           <Divider type="horizontal" dashed>Select Time Slots</Divider>
//           <RangePicker showTime={{ format: "HH:mm" }} format="MMM DD YYYY HH:mm" onChange={selectTimeSlots} />
//           <br />
//           <button className="btn1 mt-2" onClick={() => { setShowModal(true); }}>See Booked Slots</button>
//           {from && to && (
//             <div>
//               <p>Total Hours : <b>{totalHours}</b></p>
//               <p>Rent Per Hour : <b>{car.RentPerHour}</b></p>
//               <Checkbox onChange={(e) => { setDriver(e.target.checked); }}>Driver Required</Checkbox>
//               <h3>Total Amount : {totalAmount}</h3>
//               <StripeCheckout
//                 shippingAddress
//                 token={onToken}
//                 currency='INR'
//                 amount={totalAmount * 100}
//                 stripeKey="pk_test_51PfEQKIGMXT0myEMc0tW6LWBF03XGIQRKqP2cQeAdCq9sa3W4lDKcM9tGTJsYnzUa1tLIdMzQCc4NE4fP0v9XYPl00ZI4k9wkt"
//               >
//                 <button className="btn1">Book Now</button>
//               </StripeCheckout>
//             </div>
//           )}
//         </Col>
//         {car.name && (
//           <Modal visible={showModal} closable={false} footer={false} title="Booked time slots">
//             <div className="p-2">
//               {car.bookedTimeSlots.map((slot) => (
//                 <button className="btn1 mt-2" key={slot.from}>{slot.from} - {slot.to}</button>
//               ))}
//               <div className="text-right mt-5">
//                 <button className="btn1" onClick={() => { setShowModal(false); }}>CLOSE</button>
//               </div>
//             </div>
//           </Modal>
//         )}
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default BookingCar;
