import React, { useRef, useState, useEffect } from 'react';
import {
  FaShoppingBag,
  FaSearch,
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import '../scss/header.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setItems } from '../features/cartSlice';
import axios from 'axios';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  const quantity = carts.length;
  const headerRef = useRef();
  const initialDataRef = useRef([]);

  // make param pass to handleSearchInput not change.
  const fetchData = async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    const data = await res.data;
    initialDataRef.current = data;
  };

  useEffect(() => {
    fetchData();
  }, []);

  document.onscroll = () => {
    if (window.scrollY >= 100) {
      headerRef.current.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    } else {
      headerRef.current.style.boxShadow = 'none';
    }
  };

  // handle click
  const handleSearchInput = (searchInput) => {
    const dataFilter = initialDataRef.current.filter((dt) =>
      dt.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    dispatch(setItems(dataFilter));
  };

  // handleKeyDown
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchInput(searchInput);
    }
  };
  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <Link to="/" className="logo">
          XH_Shop
        </Link>
        <div className="search">
          <input
            type="text"
            placeholder="Search here..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <i
            className="search-icon"
            onClick={() => handleSearchInput(searchInput)}
          >
            <FaSearch />
          </i>
        </div>
        <div className="icon-bag">
          <Link to="/cart">
            <FaShoppingBag />
            <span>{quantity}</span>
          </Link>
        </div>
        {/* <div className="menu">
          <FaBars />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
