
import { Col, Row, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/Defaultlayout';
import Spinner from '../components/Spinner';
import { addCar } from '../features/carsSlice';

function AddCar() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);

  function onFinish(values) {
    values.bookedTimeSlots = [];

    // Ensure rentPerHour is a number
    values.rentPerHour = Number(values.rentPerHour);

    dispatch(addCar(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" className="mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Add New Car</h3>
            <hr />
            <Form.Item name="name" label="Car name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image url" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="rentPerHour" label="Rent per hour" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fuelType" label="Fuel Type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <div className="text-right">
              <button className="btn1" type="submit">ADD CAR</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddCar;

// import { Col, Row, Form, Input } from 'antd';
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import DefaultLayout from '../components/Defaultlayout';
// import Spinner from '../components/Spinner';
// import { addCar } from '../features/carsSlice';

// function AddCar() {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.alerts);

//   function onFinish(values) {
//     values.bookedTimeSlots = [];

//     dispatch(addCar(values));
//     console.log(values);
//   }


//   return (
//     <DefaultLayout>
//       {loading && <Spinner />}
//       <Row justify="center" className="mt-5">
//         <Col lg={12} sm={24} xs={24} className="p-2">
//           <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
//             <h3>Add New Car</h3>
//             <hr />
//             <Form.Item name="name" label="Car name" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="image" label="Image url" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="rentPerHour" label="Rent per hour" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="fuelType" label="Fuel Type" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>

//             <div className="text-right">
//               <button className="btn1" type="submit">ADD CAR</button>
//             </div>
//           </Form>
//         </Col>
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default AddCar;