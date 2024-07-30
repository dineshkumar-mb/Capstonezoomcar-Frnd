import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/Bookingcar';
import 'antd/dist/reset.css';
import UserBookings from './pages/UserBooking';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
//import { ProtectedRoute } from './ProtectedRoute'; // Ensure this import is correct
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ element }) {
  const { user } = useSelector((state) => state.auth);

  return user ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:carid" element={<BookingCar />} />
          <Route path="/userbookings" element={<UserBookings />} />
          <Route path="/addcar" element={<AddCar />}  />
          <Route path="/editcar/:carid" element={<EditCar />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminHome />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
