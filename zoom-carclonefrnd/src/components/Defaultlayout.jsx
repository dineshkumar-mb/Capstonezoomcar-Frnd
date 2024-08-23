import React from "react";
import { Menu, Dropdown, Button, Row, Col, Spin } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // To access loading state from Redux
import Spinner from './Spinner'; // Import your custom Spinner component if you prefer

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  
  // Accessing loading state from Redux store
  const loading = useSelector((state) => state.alerts.loading);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleAdminClick = () => {
    if (user && user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" style={{ color: 'orangered' }}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" style={{ color: 'orangered' }}>
        <Link to="/userbookings">Bookings</Link>
      </Menu.Item>
      <Menu.Item key="3" style={{ color: 'orangered' }} onClick={handleAdminClick}>
        Admin
      </Menu.Item>
      <Menu.Item key="4" style={{ color: 'orangered' }} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header">
        <Row gutter={16} justify="space-between" align="middle">
          <Col>
            <h1>
              <b>
                <Link to="/" className="logo">ZoomCar</Link>
              </b>
            </h1>
          </Col>
          <Col>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button className="dropdown-button">{user.username}</Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
      
      {/* Spinner displayed during loading */}
      <div className="content">
        {loading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : (
          props.children
        )}
      </div>
      
      <center>
        <div className="footer text-center">
          <hr />
          <p>Designed and Developed By</p>
          <p>Dinesh</p>
        </div>
      </center>
    </div>
  );
}

export default DefaultLayout;

// import React from "react";
// import { Menu, Dropdown, Button, Row, Col } from "antd";
// import { Link, useNavigate } from 'react-router-dom';

// function DefaultLayout(props) {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     window.location.href = '/login';
//   };

//   const handleAdminClick = () => {
//     if (user && user.role === 'admin') {
//       navigate('/admin');
//     } else {
//       navigate('/login');
//     }
//   };

//   const menu = (
//     <Menu>
//       <Menu.Item key="1"style={{ color: 'orangered' }}>
//         <Link to="/">Home</Link>
//       </Menu.Item>
//       <Menu.Item key="2" style={{ color: 'orangered' }}>
//         <Link to="/userbookings">Bookings</Link>
//       </Menu.Item>
//       <Menu.Item key="3" style={{ color: 'orangered' }}onClick={handleAdminClick}>
//         Admin
//       </Menu.Item>
//       <Menu.Item key="4" style={{ color: 'orangered' }} onClick={handleLogout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <div>
//       <div className="header">
//         <Row gutter={16} justify="space-between" align="middle">
//           <Col>
//             <h1>
//               <b>
//                 <Link to="/" className="logo">ZoomCar</Link>
//               </b>
//             </h1>
//           </Col>
//           <Col>
//             <Dropdown overlay={menu} placement="bottomRight">
//               <Button className="dropdown-button">{user.username}</Button>
//             </Dropdown>
//           </Col>
//         </Row>
//       </div>
//       <div className="content">{props.children}</div>
//       <center>
//       <div className="footer text-center">
//         <hr />
//         <p>Designed and Developed By</p>
//         <p>Dinesh</p>
//       </div>
//       </center>
//     </div>
//   );
// }

// export default DefaultLayout;

// import React from "react";
// import { Menu, Dropdown, Button, Row, Col } from "antd";
// import { Link } from 'react-router-dom';

// function DefaultLayout(props) {
//   const user = JSON.parse(localStorage.getItem('user'));
  
//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     window.location.href = '/login';
//   };

//   const menu = (
//     <Menu>
//       <Menu.Item key="1">
//         <Link to="/">Home</Link>
//       </Menu.Item>
//       <Menu.Item key="2">
//         <Link to="/userbookings">Bookings</Link>
//       </Menu.Item>
//       <Menu.Item key="3">
//         <Link to="/admin">Admin</Link>
//       </Menu.Item>
//       <Menu.Item key="4" style={{ color: 'orangered' }} onClick={handleLogout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <div>
//       <div className="header">
//         <Row gutter={16} justify="space-between" align="middle">
//           <Col>
//             <h1>
//               <b>
//                 <Link to="/" className="logo">ZoomCar</Link>
//               </b>
//             </h1>
//           </Col>
//           <Col>
//             <Dropdown overlay={menu} placement="bottomRight">
//               <Button className="dropdown-button">{user.username}</Button>
//             </Dropdown>
//           </Col>
//         </Row>
//       </div>
//       <div className="content">{props.children}</div>
//       <div className="footer text-center">
//         <hr />
//         <p>Designed and Developed By</p>
//         <p>Dinesh</p>
//       </div>
//     </div>
//   );
// }

// export default DefaultLayout;

