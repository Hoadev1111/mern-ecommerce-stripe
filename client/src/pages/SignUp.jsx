import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import '../scss/signup.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies['auth-mern']) {
      navigate('/');
    }
  }, [navigate, cookies]);

  // handle submit
  const handleSummit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:4000/signup`, {
        email,
        password,
      });
      const data = res.data;
      console.log('data: ', data);
      navigate('/login');
    } catch (error) {
      console.log('error: ', error);
      setError(error.response?.data.message);
    }
  };

  return (
    <div className="input">
      <div className="container">
        <span>Sign Up</span>
        <form onSubmit={handleSummit}>
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
          <button type="submit">Sign up</button>
          {error ? <span className="error">{error}</span> : ''}
          <h5 className="title">
            You have already account? <Link to="/login">Log In</Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
