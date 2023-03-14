import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../scss/notFoundProduct.scss';

const NotFoundProduct = () => {
  return (
    <div className="not-found">
      <i>
        <FaSearch />
      </i>
      <h1 className="title">Sorry, no result found</h1>
      <span className="desc">
        What you search was unfortunately not found or doesn't exist.
      </span>
    </div>
  );
};

export default NotFoundProduct;
