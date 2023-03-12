import React from 'react';
import '../scss/pageNotFound.scss';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className="page-not-found">
      <h1 className="number">404</h1>
      <h1 className="title">Page not found</h1>
      <span className="description">
        Page you are looking for might have been removed had its name changed or
        is temporarily unavaillable.
      </span>
      <button onClick={handleClick}>Homepage</button>
    </div>
  );
};

export default PageNotFound;
