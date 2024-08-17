import { Col, Row, Form, Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/Defaultlayout';
import Spinner from '../components/Spinner';
import { fetchCars, deleteCar } from '../features/carsSlice';

const { Option } = Select;

function DeleteCar() {
  const dispatch = useDispatch();
  const { loading, cars } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  function onFinish(values) {
    dispatch(deleteCar(values.carId));
    console.log('Deleted Car ID:', values.carId);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" className="mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Delete Car</h3>
            <hr />
            <Form.Item name="carId" label="Select Car" rules={[{ required: true }]}>
              <Select placeholder="Select a car to delete">
                {cars.map(car => (
                  <Option key={car._id} value={car._id}>
                    {car.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div className="text-right">
              <button className="btn1" type="submit">DELETE CAR</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default DeleteCar;
