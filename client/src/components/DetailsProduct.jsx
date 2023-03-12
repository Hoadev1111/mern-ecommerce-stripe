import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { addToCart, setItems } from '../features/cartSlice';
import Loading from './Loading';
import '../scss/detailProduct.scss';

const DetailsProduct = () => {
  const [item, setItem] = useState([]);
  const carts = useSelector((state) => state.cart.carts);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  // save to localStorage url, and then take it and navigate after login
  localStorage.setItem('detail', window.location.href);

  const getDetailProduct = async () => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const data = res.data;
    data.quantity = 1;
    setItem(data);
  };

  useEffect(() => {
    getDetailProduct();
  }, []);

  //handleAddToCart
  const handleAddToCart = (item) => {
    const isItemExit = carts.find((cart) => cart.id === item.id);
    if (isItemExit) {
      // alert('You have added to cart! ');
      return;
    }
    if (!isLogin) {
      return navigate('/login');
    }
    dispatch(addToCart({ item }));
  };

  //handleGoToCart
  const handleGoToCart = () => {
    if (!isLogin) {
      return navigate('/login');
    }
    navigate('/cart');
  };

  return item.length === 0 ? (
    // <h1>Loading...</h1>
    <Loading />
  ) : (
    <div className="container-detail">
      {/* image */}
      <div className="product-image">
        <img src={item.image} alt="" />
      </div>
      {/* info detail */}
      <div className="info-detail">
        <h1 className="category">{item.category}</h1>
        <h3 className="title">{item.title}</h3>
        <span className="price">Price: {item.price}$</span>
        <br />
        <span className="description">{item.description}</span>
        <div className="btn">
          <button onClick={() => handleAddToCart(item)}>Add to cart</button>
          {/* <Link to="/cart">
            <button>Go to cart</button>
          </Link> */}

          <button onClick={handleGoToCart}>
            <Link to="/cart">Go to cart</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
