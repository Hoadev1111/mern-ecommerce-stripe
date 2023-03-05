import React, { useEffect, useState } from 'react';
import '../scss/productList.scss';
import axios from 'axios';
import { addToCart, setItems } from '../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Products = () => {
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const items = useSelector((state) => state.cart.items);

  const getProduct = async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    const data = res.data;
    data.map((dt) => (dt.quantity = 1));
    dispatch(setItems(data));
    // setProducts(data);
    setLoading(false);
    return data;
  };

  useEffect(() => {
    getProduct();
  }, []);

  // console.log('products: ', products);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const isItemExit = carts.find((cart) => cart.id === product.id);
    if (isItemExit) {
      alert('You have added to cart! ');
      return;
    }
    dispatch(addToCart({ item: product }));
  };

  return (
    <div className="productlist">
      {loading ? (
        <h1>Loading...</h1>
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
                  <h4 className="title">{product.title}</h4>
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
