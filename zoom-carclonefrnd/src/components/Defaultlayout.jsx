import React from "react";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { Link } from 'react-router-dom';
import '../App.css'; 

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
      <div className="header">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between align-items-center">
              <h1>
                <b>
                  <Link to="/" className="logo">ZoomCar</Link>
                </b>
              </h1>
              <Dropdown overlay={menu} placement="bottomRight">
                <Button className="dropdown-button">{user.username}</Button>
              </Dropdown>
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
