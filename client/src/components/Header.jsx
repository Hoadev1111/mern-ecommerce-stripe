import React, { useRef, useState, useEffect } from 'react';
import { FaShoppingBag, FaSearch } from 'react-icons/fa';
import '../scss/header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setItems, clearCart } from '../features/cartSlice';
import { logout } from '../features/AuthSlice';
import axios from 'axios';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const carts = useSelector((state) => state.cart.carts);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let quantity = carts.length;

  // const quantity = carts.length;
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

  //make boxshadow when scroll
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

  // handleLogout
  const handleLogout = () => {
    removeCookie('auth-mern');
    dispatch(logout());
    // dispatch(clearCart());
    navigate('/login');
  };

  // handle open cart when click bag
  const handleOpenCart = () => {
    if (!isLogin) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  // handle when user click logo
  const handleClickLogo = () => {
    localStorage.removeItem('detail');
    navigate('/');
  };
  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <button onClick={handleClickLogo} className="logo">
          XH_Shop
        </button>
        {/* input search */}
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
        {/* LOG IN & SIGN UP */}
        {!isLogin && (
          <div className="authen">
            <Link to="login">LogIn</Link>
            <Link to="signup">SignUp</Link>
          </div>
        )}
        {/* LOG OUT */}
        {isLogin && (
          <div className="logout-btn" onClick={handleLogout}>
            <Link>Logout</Link>
          </div>
        )}
        {/* icon bag */}
        <div className="icon-bag" onClick={handleOpenCart}>
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
