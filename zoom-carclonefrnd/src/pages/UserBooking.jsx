
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../features/bookingSlice';
import DefaultLayout from '../components/Defaultlayout';
import { Col, Row } from 'antd';
import Spinner from '../components/Spinner';
import moment from 'moment';

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.bookings);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  if (!Array.isArray(bookings)) {
    return <div>Error: Bookings data is not an array</div>;
  }

  
  const handleUpdate = (id) => {
    const updatedBooking = {
      car: { Carname: 'Updated Car', RentPerHour: 150 },
      totalHours: 6,
      totalAmount: 900,
    };
    dispatch(editbookCar({ id, booking: updatedBooking }));
  };

  const handleDelete = (id) => {
    dispatch(deleteBooking(id));
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
                <p><b>{booking.car.Carname}</b></p>
                <p>Total hours: <b>{booking.totalHours}</b></p>
                <p>Rent per hour: <b>{booking.car.RentPerHour}</b></p>
                <p>Total amount: <b>{booking.totalAmount}</b></p>
              </Col>
              <Col lg={12} sm={24}>
                <p>Transaction Id: <b>{booking.transactionId}</b></p>
                <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD YYYY')}</b></p>
              </Col>
              <Col lg={6} sm={24} className="text-right">
                <img style={{ borderRadius: 5 }} src={booking.car.Imageurl} height="140" className="p-2" alt="Car" />
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;

