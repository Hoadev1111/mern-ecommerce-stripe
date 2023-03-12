import React from 'react';
import '../scss/successPage.scss';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className="success-page">
      <h2>Checkout Successful</h2>
      <p>
        Incase of any inqueries contact the support at{' '}
        <strong>support@xh_shop.com</strong>
      </p>
      <button onClick={handleClick}>Continue Shopping</button>
    </div>
  );
};

export default Success;
