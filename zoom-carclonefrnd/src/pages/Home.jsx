import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/Defaultlayout';
import { getAllCars } from '../features/carsSlice';
import { Col, Row, Modal, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import PriceRangeSlider from '../components/PriceRangeSlider';
import moment from 'moment';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../index.css';

const styles = {
  starWrap: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  star: {
    color: 'gold',
    fontSize: '20px',
    cursor: 'pointer',
  },
  card: {
    borderRadius: '12px',
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: '0.3s',
    height: '100%',
  },
  carImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  carTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  carDescription: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  },
  bookButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
  },
  rateButton: {
    backgroundColor: '#007bff',
    color: 'orangered',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
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

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars || []);
  }, [cars]);

  useEffect(() => {
    if (cars && Array.isArray(cars)) {
      const initialRatings = {};
      cars.forEach((car) => {
        if (car.ratings && car.ratings.length) {
          initialRatings[car._id] = car.ratings.reduce((a, b) => a + b, 0) / car.ratings.length;
        } else {
          initialRatings[car._id] = 0;
        }
      });
      setRatings(initialRatings);
    }
  }, [cars]);

  const handleReviewSubmit = (carId) => {
    const userId = user._id;

    if (ratings[carId] === undefined || reviewText === '') {
      console.error('Rating or review is missing');
      return;
    }

    axios
      .post(`https://capstonezoomcar-bknd.onrender.com/api/cars/rate/${carId}`, {
        ratings: ratings[carId],
        reviews: reviewText,
        userId,
      })
      .then((response) => {
        console.log('Response:', response.data);
        setReviewText('');
        setSelectedCar(null);
        setIsModalVisible(false);
        dispatch(getAllCars());
      })
      .catch((error) => {
        console.error('Error updating ratings and reviews', error.response?.data);
        console.log('Ratings:', ratings[carId]);
        console.log('Reviews:', reviewText);
      });
  };

  const showModal = (carId) => {
    setSelectedCar(carId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <DefaultLayout>
      {user && <h2>Welcome, {user.username}!</h2>}
      <p>Today's Date: {moment().format('MMMM Do YYYY')}</p>

      <PriceRangeSlider data={cars || []} onFilter={(filteredCars) => setTotalCars(filteredCars)} />

      {loading && <Spinner />}

      <Row justify="center" gutter={[16, 16]}>
        {Array.isArray(totalCars) &&
          totalCars.map((car) => (
            <Col lg={5} sm={12} xs={24} key={car._id}>
              <Card style={styles.card}>
                <img src={car.Imageurl} style={styles.carImage} alt={car.Carname} />
                <div style={{ padding: '10px' }}>
                  <h3 style={styles.carTitle}>{car.Carname}</h3>
                  {/* <p style={styles.carDescription}>Added on: {moment(car.createdAt).format('MMMM Do YYYY')}</p> */}
                  <p style={styles.carDescription}>Rent Per Hour: {car.RentPerHour} /-</p>
                  <p style={styles.carDescription}>
                    {car.description || 'Cars with full sophistication and well-maintained. For mindfulness and satisfaction.'}
                  </p>
                </div>
                <div style={styles.btnContainer}>
                  <Button style={styles.bookButton}>
                    <Link to={`/booking/${car._id}`} style={{ color: 'white' }}>
                      Book Now
                    </Link>
                  </Button>
                  <Button style={styles.rateButton} onClick={() => showModal(car._id)}>
                    Rate & Review
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
      <Modal
        title="Rate and Review"
        open={isModalVisible} // Updated from "visible"
        onOk={() => handleReviewSubmit(selectedCar)}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => handleReviewSubmit(selectedCar)}>
            Submit Review
          </Button>,
        ]}
      >
        {selectedCar && (
          <div>
            <div style={styles.starWrap}>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  style={styles.star}
                  onClick={() => {
                    setRatings({ ...ratings, [selectedCar]: index + 1 });
                  }}
                >
                  {index < (ratings[selectedCar] || 0) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              style={{ width: '100%', height: '80px', marginTop: '10px' }}
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
// import { Col, Row, Modal, Button, Card } from 'antd';
// import { Link } from 'react-router-dom';
// import Spinner from '../components/Spinner';
// import PriceRangeSlider from '../components/PriceRangeSlider';
// import moment from 'moment';
// import axios from 'axios';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import '../index.css';

// const styles = {
//   starWrap: {
//     display: 'flex',
//     flexDirection: 'row-reverse',
//     justifyContent: 'center',
//     marginBottom: '10px',
//   },
//   star: {
//     color: 'gold',
//     fontSize: '20px',
//     cursor: 'pointer',
//   },
//   card: {
//     borderRadius: '12px',
//     boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
//     overflow: 'hidden',
//     transition: '0.3s',
//     height: '100%',
//   },
//   carImage: {
//     width: '100%',
//     height: '150px',
//     objectFit: 'cover',
//   },
//   carTitle: {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     margin: '10px 0',
//   },
//   carDescription: {
//     fontSize: '14px',
//     color: '#555',
//     marginBottom: '10px',
//   },
//   btnContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: '10px',
//   },
//   bookButton: {
//     backgroundColor: '#007bff',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     padding: '10px',
//     cursor: 'pointer',
//   },
//   rateButton: {
//     backgroundColor: '#007bff',
//     color: 'orangered',
//     border: 'none',
//     borderRadius: '5px',
//     padding: '10px',
//     cursor: 'pointer',
//   },
// };

// function Home() {
//   const { cars, loading } = useSelector((state) => state.cars);
//   const [totalCars, setTotalCars] = useState([]);
//   const [ratings, setRatings] = useState({});
//   const [reviewText, setReviewText] = useState('');
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllCars());
//   }, [dispatch]);

//   useEffect(() => {
//     setTotalCars(cars || []);
//   }, [cars]);

//   useEffect(() => {
//     if (cars && Array.isArray(cars)) {
//       const initialRatings = {};
//       cars.forEach(car => {
//         if (car.ratings && car.ratings.length) {
//           initialRatings[car._id] = car.ratings.reduce((a, b) => a + b, 0) / car.ratings.length;
//         } else {
//           initialRatings[car._id] = 0;
//         }
//       });
//       setRatings(initialRatings);
//     }
//   }, [cars]);

//   const handleReviewSubmit = (carId) => {
//     const userId = JSON.parse(localStorage.getItem('user'))._id; // Get user ID from local storage
//     const user = JSON.parse(localStorage.getItem('user'));
    
//     if (ratings[carId] === undefined || reviewText === '') {
//       console.error('Rating or review is missing');
//       return;
//     }

//     axios.post(`https://capstonezoomcar-bknd.onrender.com/api/cars/rate/${carId}`, { 
//       ratings: ratings[carId],  // Ensure this is defined and a valid number
//       reviews: reviewText,      // Ensure this is defined and a non-empty string
//       userId                   // Include userId in the request body
//     })
//     .then(response => {
//       console.log('Response:', response.data); // Log the response for debugging
//       setReviewText('');
//       setSelectedCar(null);
//       setIsModalVisible(false);
//       dispatch(getAllCars());
//     })
//     .catch(error => {
//       console.error('Error updating ratings and reviews', error.response?.data); // Log the error for debugging
//       console.log('Ratings:', ratings[carId]); // Log the rating for debugging
//       console.log('Reviews:', reviewText); // Log the reviews for debugging
//     });
//   };

//   const showModal = (carId) => {
//     setSelectedCar(carId);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <DefaultLayout>
//       <PriceRangeSlider data={cars || []} onFilter={(filteredCars) => setTotalCars(filteredCars)} />

//       {loading && <Spinner />}

//       <Row justify="center" gutter={[16, 16]}>
//         {Array.isArray(totalCars) && totalCars.map((car) => (
//           <Col lg={5} sm={12} xs={24} key={car._id}>
//             <Card style={styles.card}>
//               <img src={car.Imageurl} style={styles.carImage} alt={car.Carname} />
//               <div style={{ padding: '10px' }}>
//                 <h3 style={styles.carTitle}>{car.Carname}</h3>
//                 <p style={styles.carDescription}>Rent Per Hour: {car.RentPerHour} /-</p>
//                 <p style={styles.carDescription}>{car.description || " Cars with full sophistication and well-maintained. For mindfulness and satisfaction."}</p>
//               </div>
//               <div style={styles.btnContainer}>
//                 <Button style={styles.bookButton}>
//                   <Link to={`/booking/${car._id}`} style={{ color: 'white' }}>Book Now</Link>
//                 </Button>
//                 <Button style={styles.rateButton} onClick={() => showModal(car._id)}>
//                   Rate & Review
//                 </Button>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//       <Modal
//         title="Rate and Review"
//         visible={isModalVisible}
//         onOk={() => handleReviewSubmit(selectedCar)}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={() => handleReviewSubmit(selectedCar)}>
//             Submit Review
//           </Button>,
//         ]}
//       >
//         {selectedCar && (
//           <div>
//             <div style={styles.starWrap}>
//               {[...Array(5)].map((_, index) => (
//                 <span
//                   key={index}
//                   style={styles.star}
//                   onClick={() => {
//                     setRatings({ ...ratings, [selectedCar]: index + 1 });
//                   }}
//                 >
//                   {index < (ratings[selectedCar] || 0) ? '★' : '☆'}
//                 </span>
//               ))}
//             </div>
//             <textarea
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               placeholder="Write your review here..."
//               style={{ width: '100%', height: '80px', marginTop: '10px' }}
//             />
//           </div>
//         )}
//       </Modal>
//     </DefaultLayout>
//   );
// }

// export default Home;
