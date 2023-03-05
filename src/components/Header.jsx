import React, { useRef } from 'react';
import { FaShoppingBag, FaSearch } from 'react-icons/fa';
import '../scss/header.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const carts = useSelector((state) => state.cart.carts);
  const quantity = carts.length;
  const headerRef = useRef();

  document.onscroll = () => {
    if (window.scrollY >= 100) {
      headerRef.current.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    } else {
      headerRef.current.style.boxShadow = 'none';
    }
  };
  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <Link to="/" className="logo">
          XH_Shop
        </Link>
        <div className="icon-bag">
          <Link to="/cart">
            <FaShoppingBag />
            <span>{quantity}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
