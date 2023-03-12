import React, { useState, useEffect } from 'react';
import '../scss/login.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { login } from '../features/AuthSlice';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detail = localStorage.getItem('detail');
  // take param and navigate to it when user login
  const paramDetail = detail?.split('0/')[1];
  const PORT = process.env.PORT || 4001;
  console.log('PORT: ', PORT);

  useEffect(() => {
    if (cookies['auth-mern']) {
      navigate('/');
    }
  }, [cookies, navigate]);

  // handle login form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:${PORT}/login`, {
        email,
        password,
      });
      const data = res.data;
      dispatch(login());
      // if user is in detail page, after login navigate to it
      if (paramDetail) {
        localStorage.removeItem('detail');
        navigate(`/${paramDetail}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data.message);
    }
  };
  return (
    <div className="input">
      <div className="container">
        <span>Login</span>
        <form onSubmit={handleSubmit}>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Log In</button>
          {error ? <span className="error">{error}</span> : ''}
          <h5 className="title">
            You don't have account? <Link to="/signup">Sign Up</Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Login;
