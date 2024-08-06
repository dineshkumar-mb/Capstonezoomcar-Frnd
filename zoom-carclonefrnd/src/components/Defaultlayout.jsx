import React from "react";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { Link } from 'react-router-dom';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/userbookings">Bookings</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin">Admin</Link>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        <span style={{ color: 'orangered' }}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="header-content">
              <h1>
                <b>
                  <Link to="/" className="zoomcar-logo">ZoomCar</Link>
                </b>
              </h1>
              {user ? (
                <Dropdown overlay={menu} placement="bottom">
                  <Button>{user.username}</Button>
                </Dropdown>
              ) : (
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
      <div className="footer text-center">
        <hr />
        <p>Designed and Developed By</p>
        <p>Dinesh</p>
      </div>
    </div>
  );
}

export default DefaultLayout;


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
//       <Menu.Item>
//         <Link to="/">Home</Link>
//       </Menu.Item>
//       <Menu.Item>
//         <Link to="/userbookings">Bookings</Link>
//       </Menu.Item>
     
//       <Menu.Item>
//         <Link to="/admin">Admin</Link>
//       </Menu.Item>
//       <Menu.Item onClick={handleLogout}>
//         <span style={{ color: 'orangered' }}>Logout</span>
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <div>
//       <div className="header bs1">
//         <Row gutter={16} justify="center">
//           <Col lg={20} sm={24} xs={24}>
//             <div className="d-flex justify-content-between">
//               <h1>
//                 <b>
//                   <Link to="/" style={{ color: 'orangered' }}>ZoomCar</Link>
//                 </b>
//               </h1>
//               <Dropdown overlay={menu} placement="bottom">
//                 <Button>{user.username}</Button>
//               </Dropdown>
//             </div>
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

