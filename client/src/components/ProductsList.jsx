import React, { useEffect, useState } from 'react';
import '../scss/productList.scss';
import axios from 'axios';
import { addToCart, setItems } from '../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Loading from './Loading';
import NotFoundProduct from '../pages/NotFoundProduct';

let firstRender = true;
const Products = () => {
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const items = useSelector((state) => state.cart.items);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const PORT = process.env.PORT || 4001;

  // get product
  const getProduct = async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    const data = res.data;
    data.map((dt) => (dt.quantity = 1));
    dispatch(setItems(data));
    // setProducts(data);
    setLoading(false);
    return data;
  };

  // refresh token
  const refreshToken = async () => {
    const res = await axios.get(
      `http://localhost:${PORT}/refreshToken`,
      {},
      {
        withCredentials: true,
      }
    );
    const data = res.data;
    return data;
  };

  useEffect(() => {
    getProduct();
  }, []);

  // console.log('products: ', products);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLogin) {
      return navigate('/login');
    }
    const isItemExit = carts.find((cart) => cart.id === product.id);
    if (isItemExit) {
      // alert('You have added to cart! ');
      return;
    }
    dispatch(addToCart({ item: product }));
  };

  return (
    <div className="productlist">
      {loading ? (
        // <h1>Loading...</h1>
        <Loading />
      ) : items.length === 0 ? (
        <NotFoundProduct />
      ) : (
        items.map((product) => {
          return (
            <Link
              to={`/product/${product.id}`}
              className="container"
              key={product.id}
            >
              <div className="product-list">
                <div className="product-image">
                  <img className="img" src={product.image} alt="" />
                </div>
                <div className="product-info">
                  <h4 className="title" title={product.title}>
                    {product.title}
                  </h4>
                  <span className="price">Price: ${product.price}</span>
                  <button onClick={(e) => handleAddToCart(e, product)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Products;
