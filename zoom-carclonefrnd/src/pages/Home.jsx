import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/Defaultlayout';
import { getAllCars } from '../features/carsSlice';
import { Col, Row, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import PriceRangeSlider from '../components/PriceRangeSlider';
import moment from 'moment';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import '../index.css'

const styles = {
  starWrap: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center', // Center stars horizontally
    marginBottom: '10px',
  },
  star: {
    color: 'gold',
    fontSize: '20px',
    cursor: 'pointer',
  },
  car: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginBottom: '20px',
    transition: '0.3s',
    position: 'relative',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  carHover: {
    boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)',
  },
  carImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
  },
  carContent: {
    padding: '10px',
  },
  textLeft: {
    textAlign: 'left',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10px',
  },
  btn: {
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    borderRadius: '5px',
    marginBottom: '10px', // Space between buttons
  },
  modalButton: {
    padding: '10px 20px',
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    height: '80px',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
};

function Home() {
  const { cars, loading } = useSelector((state) => state.cars);
  const [totalCars, setTotalCars] = useState([]);
  const [ratings, setRatings] = useState({});
  const [reviewText, setReviewText] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars || []);
  }, [cars]);

  useEffect(() => {
    if (cars && Array.isArray(cars)) {
      const initialRatings = {};
      cars.forEach(car => {
        if (car.ratings && car.ratings.length) {
          initialRatings[car._id] = car.ratings.reduce((a, b) => a + b, 0) / car.ratings.length;
        } else {
          initialRatings[car._id] = 0;
        }
      });
      setRatings(initialRatings);
    }
  }, [cars]);

  function setFilter(values) {
    const selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm');
    const selectedTo = moment(values[1], 'MMM DD yyyy HH:mm');

    const temp = [];

    if (cars && Array.isArray(cars)) {
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
    }

    setTotalCars(temp);
  }

  const handleFilter = (filteredCars) => {
    setTotalCars(filteredCars);
  };

  const handleStarClick = (carId, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [carId]: rating,
    }));
  };

  const handleReviewSubmit = (carId) => {
    const user = JSON.parse(localStorage.getItem('user')).username;
    axios.post(`http://localhost:3001/api/cars/rate/${carId}`, { rating: ratings[carId], review: reviewText, user })
      .then(response => {
        console.log('Rating and review updated', response);
        setReviewText(''); // clear the review text
        setSelectedCar(null); // deselect car after review
        setIsModalVisible(false); // hide the modal
        dispatch(getAllCars()); // Re-fetch cars to update ratings
      })
      .catch(error => console.error('Error updating rating and review', error));
  };

  const renderStars = (carId, rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className="fas fa-star"
          style={i <= rating ? styles.star : styles.starInactive}
          onClick={() => handleStarClick(carId, i)}
        ></i>
      );
    }
    return stars;
  };

  const showModal = (carId) => {
    setSelectedCar(carId);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    handleReviewSubmit(selectedCar);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <DefaultLayout>
      <PriceRangeSlider data={cars || []} onFilter={handleFilter} />

      {loading && <Spinner />}

      <Row justify="center" gutter={16}>
        {Array.isArray(totalCars) && totalCars.map((car) => (
          <Col lg={5} sm={24} xs={24} key={car._id}>
            <div
              className="car p-2 bs1"
              style={styles.car}
              onMouseEnter={(e) => (e.currentTarget.style = { ...styles.car, ...styles.carHover })}
              onMouseLeave={(e) => (e.currentTarget.style = styles.car)}
            >
              <img src={car.Imageurl} className="carimg" style={styles.carImage} alt={car.Carname} />
              <div className="car-content" style={styles.carContent}>
                <div className="text-left" style={styles.textLeft}>
                  <p>{car.Carname}</p>
                  <p>Rent Per Hour: {car.RentPerHour} /-</p>
                  {/* <div className="star-wrap" style={styles.starWrap}>
                    {renderStars(car._id, ratings[car._id])}
                  </div> */}
                </div>
              </div>
              <div style={styles.btnContainer}>
                <button className="btn1" style={styles.btn}>
                  <Link to={`/booking/${car._id}`} style={{ color: 'white' }}>Book Now</Link>
                </button>
                <button
                  onClick={() => showModal(car._id)}
                  style={styles.modalButton}
                >
                  Rate & Review
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal
        title="Rate and Review"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit Review
          </Button>,
        ]}
      >
        {selectedCar && (
          <div>
            <div className="star-wrap" style={styles.starWrap}>
              {renderStars(selectedCar, ratings[selectedCar])}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              style={styles.textarea}
            />
          </div>
        )}
      </Modal>
    </DefaultLayout>
  );
}

export default Home;







// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import DefaultLayout from '../components/Defaultlayout'; 
// import { getAllCars } from '../features/carsSlice'; 
// import { Col, Row } from 'antd';
// import { Link } from 'react-router-dom';
// import Spinner from '../components/Spinner';
// import PriceRangeSlider from '../components/PriceRangeSlider';
// import moment from 'moment';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

// const styles = {
//   starWrap: {
//     display: 'flex',
//     flexDirection: 'row-reverse',
//   },
//   star: {
//     color: 'gold',
//     fontSize: '20px',
//   },
// };

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
//         let isAvailable = true;
//         for (const booking of car.bookedTimeSlots) {
//           if (
//             selectedFrom.isBetween(booking.from, booking.to) ||
//             selectedTo.isBetween(booking.from, booking.to) ||
//             moment(booking.from).isBetween(selectedFrom, selectedTo) ||
//             moment(booking.to).isBetween(selectedFrom, selectedTo)
//           ) {
//             isAvailable = false;
//             break;
//           }
//         }
//         if (isAvailable) {
//           temp.push(car);
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
//         {Array.isArray(totalCars) && totalCars.map((car) => (
//           <Col lg={5} sm={24} xs={24} key={car._id}>
//             <div className="car p-2 bs1" style={styles.car}>
//               <img src={car.Imageurl} className="carimg" style={styles.carImage} alt={car.Carname} />
//               <div className="car-content" style={styles.carContent}>
//                 <div className="text-left" style={styles.textLeft}>
//                   <p>{car.Carname}</p>
//                   <p>Rent Per Hour {car.RentPerHour} /-</p>
//                   <p>Cars with full  urbanity and well maintained. "For mindfulness and satisfaction"</p>
//                   <div className="star-wrap" style={styles.starWrap}>
//                 <i className="fas fa-star" style={styles.star}></i> 
//                 <i className="fas fa-star" style={styles.star}></i> 
//                 <i className="fas fa-star" style={styles.star}></i>
//                 <i className="fas fa-star" style={styles.star}></i>
//                 <i className="fas fa-star" style={styles.star}></i> 
//               </div>
//                 </div>
//                 <div>
//                   <button className="btn1" style={styles.btn}>
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

