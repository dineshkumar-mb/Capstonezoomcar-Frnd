// added protected route and admin protected route acording to role
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/UserBooking';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import {ProtectedRoute, AdminProtectedRoute } from './routes/AdminProtectedRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home />}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:carid" element={<ProtectedRoute element={<BookingCar />} />} />
          <Route path="/userbookings" element={<ProtectedRoute element={<UserBookings />} />} />
          <Route path="/addcar" element={<ProtectedRoute element={<AddCar />} />} />
          <Route path="/editcar/:carid" element={<ProtectedRoute element={<EditCar />} />} />
          <Route path="/admin" element={<AdminProtectedRoute element={<AdminHome />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

