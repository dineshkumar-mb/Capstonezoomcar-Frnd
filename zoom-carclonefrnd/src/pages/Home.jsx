import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/Defaultlayout'; 
import { getAllCars } from '../features/carsSlice'; 
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import PriceRangeSlider from '../components/PriceRangeSlider';
import moment from 'moment';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const styles = {
  starWrap: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  star: {
    color: 'gold',
    fontSize: '20px',
  },
};

function Home() {
  const { cars, loading } = useSelector((state) => state.cars);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  function setFilter(values) {
    const selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm');
    const selectedTo = moment(values[1], 'MMM DD yyyy HH:mm');

    const temp = [];

    for (const car of cars) {
      if (car.bookedTimeSlots.length === 0) {
        temp.push(car);
      } else {
        let isAvailable = true;
        for (const booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
            isAvailable = false;
            break;
          }
        }
        if (isAvailable) {
          temp.push(car);
        }
      }
    }

    setTotalCars(temp);
  }

  const handleFilter = (filteredCars) => {
    setTotalCars(filteredCars);
  };

  return (
    <DefaultLayout>
      <PriceRangeSlider data={cars} onFilter={handleFilter} />

      {loading && <Spinner />}

      <Row justify="center" gutter={16}>
        {Array.isArray(totalCars) && totalCars.map((car) => (
          <Col lg={5} sm={24} xs={24} key={car._id}>
            <div className="car p-2 bs1" style={styles.car}>
              <img src={car.Imageurl} className="carimg" style={styles.carImage} alt={car.Carname} />
              <div className="car-content" style={styles.carContent}>
                <div className="text-left" style={styles.textLeft}>
                  <p>{car.Carname}</p>
                  <p>Rent Per Hour {car.RentPerHour} /-</p>
                  <p>Cars with full  urbanity and well maintained. "For mindfulness and satisfaction"</p>
                  <div className="star-wrap" style={styles.starWrap}>
                <i className="fas fa-star" style={styles.star}></i> 
                <i className="fas fa-star" style={styles.star}></i> 
                <i className="fas fa-star" style={styles.star}></i>
                <i className="fas fa-star" style={styles.star}></i>
                <i className="fas fa-star" style={styles.star}></i> 
              </div>
                </div>
                <div>
                  <button className="btn1" style={styles.btn}>
                    <Link to={`/booking/${car._id}`}>Book Now</Link>
                  </button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default Home;


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import DefaultLayout from '../components/Defaultlayout';
// import { getAllCars } from '../features/carsSlice'; // Adjust the import path as needed
// import { Col, Row } from 'antd';
// import { Link } from 'react-router-dom';
// import Spinner from '../components/Spinner';
// import PriceRangeSlider from '../components/PriceRangeSlider';
// import moment from 'moment';
// <style>
// .star-wrap {
//   display: flex;
//   flex-direction: reverse; 
  
// }
// </style>
// function Home() {
//   const { cars, loading } = useSelector((state) => state.cars);
//   const [totalCars, setTotalCars] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllCars());
//   }, [dispatch]);

//   useEffect(() => {
//     setTotalCars(cars);
//   }, [cars]);

//   function setFilter(values) {
//     const selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm');
//     const selectedTo = moment(values[1], 'MMM DD yyyy HH:mm');

//     const temp = [];

//     for (const car of cars) {
//       if (car.bookedTimeSlots.length === 0) {
//         temp.push(car);
//       } else {
//         for (const booking of car.bookedTimeSlots) {
//           if (
//             selectedFrom.isBetween(booking.from, booking.to) ||
//             selectedTo.isBetween(booking.from, booking.to) ||
//             moment(booking.from).isBetween(selectedFrom, selectedTo) ||
//             moment(booking.to).isBetween(selectedFrom, selectedTo)
//           ) {
//             // Do nothing
//           } else {
//             temp.push(car);
//           }
//         }
//       }
//     }

//     setTotalCars(temp);
//   }

//   const handleFilter = (filteredCars) => {
//     setTotalCars(filteredCars);
//   };

//   return (
//     <DefaultLayout>
//       <PriceRangeSlider data={cars} onFilter={handleFilter} />

//       {loading && <Spinner />}

//       <Row justify="center" gutter={16}>
//         {Array.isArray(totalCars) && totalCars.map((car) => ( // Ensure totalCars is an array
//           <Col lg={5} sm={24} xs={24} key={car._id}>
//             <div className="car p-2 bs1">
//             <div className="star-wrap">
//               <i className="fas fa-star" style="color: gold; font-size: 24px;"></i> 
//               <i className="fas fa-star" style="color: gold; font-size: 24px;"> </i> 
//                 <i className="fas fa-star" style="color: gold; font-size: 24px;"></i>
//                 <i className="fas fa-star" style="color: gold; font-size: 24px;"></i>
//                 <i className="fas fa-star" style="color: gold; font-size: 24px;"></i> 
             
//             </div>
//               <img src={car.Imageurl} className="carimg" alt={car.Carname} />

//               <div className="car-content d-flex align-items-center justify-content-between">
//                 <div className="text-left pl-2">
//                   <p>{car.Carname}</p>
//                   <p> Rent Per Hour {car.RentPerHour} /-</p>
//                   <p>cars with full sofasticated and well maintained. "For mindfullness and satisfaction"</p>
//                 </div>

//                 <div>
//                   <button className="btn1 mr-2">
//                     <Link to={`/booking/${car._id}`}>Book Now</Link>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         ))}
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default Home;

