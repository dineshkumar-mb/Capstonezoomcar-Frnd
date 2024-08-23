import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../features/registerSlice';
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css';
import '../index.css';
AOS.init();

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const resultAction = await dispatch(userLogin(values));
      const user = resultAction.payload.user;
  
      if (user) {
        // Check if user is an admin
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        navigate('/login'); // Handle case where user is not found
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='login'>
      {loading && <Spinner />}
      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={16} style={{ position: 'relative' }}>
          <img
            className='w-100'
            data-aos='slide-right'
            data-aos-duration='1500'
            src='https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
            alt='Zoom car'
          />
          <h1 className='login-logo'>Zoom car</h1>
        </Col>
        <Col lg={6} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
            <h1>Login</h1>
            <hr />
            <Form.Item
              name='username'
              label='Username'
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 4, message: 'Username must be at least 4 characters long!' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters long!' }
              ]}
            >
              <Input type='password' />
            </Form.Item>

            <button className='btn1 mt-2' type='submit'>Login</button>

            <hr />

            <Link to='/register'>Click Here to Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
