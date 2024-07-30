import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCar, getAllCars } from '../features/carsSlice'; // Adjust the import path as needed
import { Col, Row, Form, Input } from 'antd';
import DefaultLayout from '../components/Defaultlayout';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';

function EditCar() {
  const { carid } = useParams();
  const dispatch = useDispatch();
  const { cars, loading } = useSelector((state) => state.cars);
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((c) => c._id === carid));
    }
  }, [cars, carid, dispatch]);

  function onFinish(values) {
    values._id = car._id;
    dispatch(editCar(values));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" className="mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          {car && (
            <Form className="bs1 p-2" layout="vertical" onFinish={onFinish} initialValues={car}>
              <h3>Edit Car</h3>
              <hr />
              <Form.Item name="Carname" label="Car name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="Imageurl" label="Image url" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="RentPerHour" label="Rent per hour" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="Capacity" label="Capacity" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="FuelType" label="Fuel Type" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <div className="text-right">
                <button className="btn1">EDIT CAR</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCar;
