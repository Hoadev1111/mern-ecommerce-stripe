import React from 'react';
import '../scss/cancel.scss';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className="cancel-page">
      <span>Sorry to see you cancelled your Stripe payment!</span>
      <button onClick={handleClick}>Return to store</button>
    </div>
  );
};

export default Cancel;
