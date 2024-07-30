import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/Defaultlayout';
import { getAllCars } from '../features/carsSlice'; // Adjust the import path as needed
import { Col, Row, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';

const { RangePicker } = DatePicker;

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
        for (const booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
            // Do nothing
          } else {
            temp.push(car);
          }
        }
      }
    }

    setTotalCars(temp);
  }

  console.log('totalCars:', totalCars); // Add this line to check the type of totalCars

  return (
    <DefaultLayout>
      {/* <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row> */}

      {loading && <Spinner />}

      <Row justify="center" gutter={16}>
        {Array.isArray(totalCars) && totalCars.map((car) => ( // Ensure totalCars is an array
          <Col lg={5} sm={24} xs={24} key={car._id}>
            <div className="car p-2 bs1">
              <img src={car.Imageurl} className="carimg" alt={car.Carname} />

              <div className="car-content d-flex align-items-center justify-content-between">
                <div className="text-left pl-2">
                  <p>{car.Carname}</p>
                  <p> Rent Per Hour {car.RentPerHour} /-</p>
                  <p>cars with full sofasticated and well maintained. "To enjoy your Trip with mindfullness and satisfaction"</p>
                </div>

                <div>
                  <button className="btn1 mr-2">
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
