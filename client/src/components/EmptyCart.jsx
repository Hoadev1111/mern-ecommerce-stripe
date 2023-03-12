import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../scss/emptyCart.scss';

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="container">
        <i className="icon-empty">
          <FaShoppingCart />
        </i>
        <h1>Your cart is empty</h1>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default EmptyCart;
