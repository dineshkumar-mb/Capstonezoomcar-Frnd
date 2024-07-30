import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars, deleteCar } from '../features/carsSlice'; // Adjust the import path as needed
import { Col, Row, Button } from 'antd';
import DefaultLayout from '../components/Defaultlayout';
import Spinner from '../components/Spinner';

function AdminHome() {
  const dispatch = useDispatch();
  const { cars, loading } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <h3 className="text-center mt-2">Admin Panel</h3>
      <Row justify="center" gutter={16}>
        {cars.map((car) => (
          <Col lg={5} sm={24} xs={24} key={car._id}>
            <div className="car p-2 bs1">
              <img src={car.image} className="carimg" alt={car.name} />
              <div className="car-content d-flex align-items-center justify-content-between">
                <div className="text-left pl-2">
                  <p>{car.name}</p>
                  <p> Rent Per Hour {car.rentPerHour} /-</p>
                </div>
                <div>
                  <Button
                    type="primary"
                    danger
                    onClick={() => dispatch(deleteCar(car._id))}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;
