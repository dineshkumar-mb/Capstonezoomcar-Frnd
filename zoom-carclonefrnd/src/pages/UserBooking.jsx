import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings, updateBooking, deleteBooking } from '../features/bookingSlice';
import DefaultLayout from '../components/Defaultlayout';
import { Col, Row, Button, Modal, Form, DatePicker, InputNumber, Switch } from 'antd';
import Spinner from '../components/Spinner';
import moment from 'moment';

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.bookings);
  const user = JSON.parse(localStorage.getItem('user'));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  if (!Array.isArray(bookings)) {
    return <div>Error: Bookings data is not an array</div>;
  }

  const showUpdateModal = (booking) => {
    setSelectedBooking(booking);
    form.setFieldsValue({
      totalHours: booking.totalHours,
      from: moment(booking.bookedTimeSlots.from),
      to: moment(booking.bookedTimeSlots.to),
      rentPerHour: booking.car?.RentPerHour || 0,
      driverRequired: booking.driverRequired,
    });
    setIsModalVisible(true);
  };

  const handleUpdate = (values) => {
    const totalAmount = values.totalHours * selectedBooking.car.RentPerHour;
    const updatedBooking = {
      ...selectedBooking,
      totalHours: values.totalHours,
      bookedTimeSlots: {
        from: values.from.format("MMM DD YYYY HH:mm "),
        to: values.to.format("MMM DD YYYY HH:mm"),
      },
      totalAmount: totalAmount,
      driverRequired: values.driverRequired,
    };
    dispatch(updateBooking({ id: selectedBooking._id, bookingData: updatedBooking }));
    setIsModalVisible(false);
  };

  const handleDelete = (bookingId) => {
    dispatch(deleteBooking(bookingId));
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <h3 className="text-center mt-2">My Bookings</h3>
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings.filter((o) => o.user === user._id).map((booking) => (
            <Row gutter={16} className="bs1 mt-3 text-left" key={booking._id}>
              <Col lg={6} sm={24}>
                <p><b>{booking.car?.Carname || "N/A"}</b></p>
                <p>Total hours: <b>{booking.totalHours}</b></p>
                <p>Rent per hour: <b>{booking.car?.RentPerHour || "N/A"}</b></p>
                <p>Total amount: <b>{booking.totalAmount}</b></p>
              </Col>
              <Col lg={12} sm={24}>
                <p>Transaction Id: <b>{booking.transactionId}</b></p>
                {/* <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                <p>To: <b>{booking.bookedTimeSlots.to}</b></p> */}
                <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD YYYY HH:mm')}</b></p>
                <p>Driver Required: <b>{booking.driverRequired ? "Yes" : "No"}</b></p>
              </Col>
              <Col lg={6} sm={24} className="text-right">
                {booking.car?.Imageurl && (
                  <img 
                    style={{ borderRadius: 5 }} 
                    src={booking.car.Imageurl} 
                    height="100"
                    width="80" 
                    className="p-2" 
                    alt={booking.car.Carname} 
                  />
                )}
                <Button type="primary" className="m-2" onClick={() => showUpdateModal(booking)}>Update</Button>
                <Button danger className="m-2" onClick={() => handleDelete(booking._id)}>Delete</Button>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>

      <Modal
        title="Update Booking"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          {/* <Form.Item name="totalHours" label="Total Hours">
            <InputNumber min={1} />
          </Form.Item> */}
          <Form.Item name="from" label="From">
            <DatePicker showTime format="MMM DD YYYY HH:mm" />
          </Form.Item>
          <Form.Item name="to" label="To">
            <DatePicker showTime format="MMM DD YYYY HH:mm" />
          </Form.Item>
          <Form.Item name="rentPerHour" label="Rent Per Hour">
            <InputNumber min={1} disabled />
          </Form.Item>
          <Form.Item name="driverRequired" label="Driver Required" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Button type="primary" htmlType="submit">Update</Button>
        </Form>
      </Modal>
    </DefaultLayout>
  );
}

export default UserBookings;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllBookings, updateBooking, deleteBooking } from '../features/bookingSlice';
// import DefaultLayout from '../components/Defaultlayout';
// import { Col, Row, Button, Modal, Form, DatePicker, InputNumber, Switch } from 'antd';
// import Spinner from '../components/Spinner';
// import moment from 'moment';

// function UserBookings() {
//   const dispatch = useDispatch();
//   const { bookings, loading } = useSelector((state) => state.bookings);
//   const user = JSON.parse(localStorage.getItem('user'));
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     dispatch(getAllBookings());
//   }, [dispatch]);

//   if (!Array.isArray(bookings)) {
//     return <div>Error: Bookings data is not an array</div>;
//   }

//   const showUpdateModal = (booking) => {
//     setSelectedBooking(booking);
//     form.setFieldsValue({
//       totalHours: booking.totalHours,
//       from: moment(booking.bookedTimeSlots.from),
//       to: moment(booking.bookedTimeSlots.to),
//       rentPerHour: booking.car.RentPerHour,
//       driverRequired: booking.driverRequired,
//     });
//     setIsModalVisible(true);
//   };

//   const handleUpdate = (values) => {
//     const totalAmount = values.totalHours * selectedBooking.car.RentPerHour;
//     const updatedBooking = {
//       ...selectedBooking,
//       totalHours: values.totalHours,
//       bookedTimeSlots: {
//         from: values.from.format("MMM DD YYYY HH:mm"),
//         to: values.to.format("MMM DD YYYY HH:mm"),
//       },
//       totalAmount: totalAmount,
//       driverRequired: values.driverRequired,
//     };
//     dispatch(updateBooking({ id: selectedBooking._id, bookingData: updatedBooking }));
//     setIsModalVisible(false);
//   };

//   const handleDelete = (bookingId) => {
//     dispatch(deleteBooking(bookingId));
//   };

//   return (
//     <DefaultLayout>
//       {loading && <Spinner />}
//       <h3 className="text-center mt-2">My Bookings</h3>
//       <Row justify="center" gutter={16}>
//         <Col lg={16} sm={24}>
//           {bookings.filter((o) => o.user === user._id).map((booking) => (
//             <Row gutter={16} className="bs1 mt-3 text-left" key={booking._id}>
//               <Col lg={6} sm={24}>
//                 <p><b>{booking.car.Carname}</b></p>
//                 <p>Total hours: <b>{booking.totalHours}</b></p>
//                 <p>Rent per hour: <b>{booking.car.RentPerHour}</b></p>
//                 <p>Total amount: <b>{booking.totalAmount}</b></p>
//               </Col>
//               <Col lg={12} sm={24}>
//                 <p>Transaction Id: <b>{booking.transactionId}</b></p>
//                 <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
//                 <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
//                 <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD YYYY')}</b></p>
//                 <p>Driver Required: <b>{booking.driverRequired ? "Yes" : "No"}</b></p>
//               </Col>
//               <Col lg={6} sm={24} className="text-right">
//                 {/* <img style={{ borderRadius: 5 }} src={booking.Imageurl} height="140" className="p-2" alt="Car" /> */}
//                 <Button type="primary" className="m-2" onClick={() => showUpdateModal(booking)}>Update</Button>
//                 <Button danger className="m-2" onClick={() => handleDelete(booking._id)}>Delete</Button>
//               </Col>
//             </Row>
//           ))}
//         </Col>
//       </Row>

//       <Modal
//         title="Update Booking"
//         open={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleUpdate}>
//           <Form.Item name="totalHours" label="Total Hours">
//             <InputNumber min={1} />
//           </Form.Item>
//           <Form.Item name="from" label="From">
//             <DatePicker showTime format="MMM DD YYYY HH:mm" />
//           </Form.Item>
//           <Form.Item name="to" label="To">
//             <DatePicker showTime format="MMM DD YYYY HH:mm" />
//           </Form.Item>
//           <Form.Item name="rentPerHour" label="Rent Per Hour">
//             <InputNumber min={1} disabled />
//           </Form.Item>
//           <Form.Item name="driverRequired" label="Driver Required" valuePropName="checked">
//             <Switch />
//           </Form.Item>
//           <Button type="primary" htmlType="submit">Update</Button>
//         </Form>
//       </Modal>
//     </DefaultLayout>
//   );
// }

// export default UserBookings;



// code with crud functions

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllBookings, updateBooking, deleteBooking } from '../features/bookingSlice';
// import DefaultLayout from '../components/Defaultlayout';
// import { Col, Row, Button, Modal, Form,  DatePicker } from 'antd';
// import Spinner from '../components/Spinner';
// import moment from 'moment';

// function UserBookings() {
//   const dispatch = useDispatch();
//   const { bookings, loading } = useSelector((state) => state.bookings);
//   const user = JSON.parse(localStorage.getItem('user'));
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     dispatch(getAllBookings());
//   }, [dispatch]);

//   if (!Array.isArray(bookings)) {
//     return <div>Error: Bookings data is not an array</div>;
//   }

//   const showUpdateModal = (booking) => {
//     setSelectedBooking(booking);
//     form.setFieldsValue({
//       totalHours: booking.totalHours,
//       from: moment(booking.bookedTimeSlots.from),
//       to: moment(booking.bookedTimeSlots.to),
//     });
//     setIsModalVisible(true);
//   };

//   const handleUpdate = (values) => {
//     const updatedBooking = {
//       ...selectedBooking,
//       totalHours: values.totalHours,
//       bookedTimeSlots: {
//         from: values.from.format("MMM DD yyyy HH:mm"),
//         to: values.to.format("MMM DD yyyy HH:mm"),
//       },
//     };
//     dispatch(updateBooking({ id: selectedBooking._id, bookingData: updatedBooking }));
//     setIsModalVisible(false);
//   };

//   const handleDelete = (bookingId) => {
//     dispatch(deleteBooking(bookingId));
//   };

//   return (
//     <DefaultLayout>
//       {loading && <Spinner />}
//       <h3 className="text-center mt-2">My Bookings</h3>
//       <Row justify="center" gutter={16}>
//         <Col lg={16} sm={24}>
//           {bookings.filter((o) => o.user === user._id).map((booking) => (
//             <Row gutter={16} className="bs1 mt-3 text-left" key={booking._id}>
//               <Col lg={6} sm={24}>
//                 <p><b>{booking.car.Carname}</b></p>
//                 <p>Total hours: <b>{booking.totalHours}</b></p>
//                 <p>Rent per hour: <b>{booking.car.RentPerHour}</b></p>
//                 <p>Total amount: <b>{booking.totalAmount}</b></p>
//               </Col>
//               <Col lg={12} sm={24}>
//                 <p>Transaction Id: <b>{booking.transactionId}</b></p>
//                 <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
//                 <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
//                 <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD YYYY')}</b></p>
//               </Col>
//               <Col lg={6} sm={24} className="text-right">
//                 <img style={{ borderRadius: 5 }} src={booking.Imageurl} height="140" className="p-2" alt="Car" />
//                 <Button type="primary" className="m-2" onClick={() => showUpdateModal(booking)}>Update</Button>
//                 <Button type="danger" className="m-2" onClick={() => handleDelete(booking._id)}>Delete</Button>
//               </Col>
//             </Row>
//           ))}
//         </Col>
//       </Row>

//       <Modal
//         title="Update Booking"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleUpdate}>
         
//           <Form.Item name="from" label="From">
//             <DatePicker showTime format="MMM DD yyyy HH:mm" />
//           </Form.Item>
//           <Form.Item name="to" label="To">
//             <DatePicker showTime format="MMM DD yyyy HH:mm" />
//           </Form.Item>
//           <Button type="primary" htmlType="submit">Update</Button>
//         </Form>
//       </Modal>
//     </DefaultLayout>
//   );
// }

// export default UserBookings;
