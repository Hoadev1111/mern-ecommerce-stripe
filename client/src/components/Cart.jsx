import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from '../features/cartSlice';
import '../scss/cart.scss';
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import axios from 'axios';

const Cart = () => {
  const [disableButton, setDisableButton] = useState(false);
  const carts = useSelector((state) => state.cart.carts);

  const totalPriceItem = carts.reduce(
    (init, cur) => init + cur.price * cur.quantity,
    0
  );

  const dispatch = useDispatch();

  const handleDecrease = (cart) => {
    dispatch(decreaseCount(cart));
  };

  const handleIncrease = (cart) => {
    dispatch(increaseCount(cart));
  };

  const handleRemoveFromCart = (cart) => {
    dispatch(removeFromCart(cart));
  };

  // http://localhost:4000
  const handleCheckOut = async () => {
    setDisableButton(true);
    const res = await axios.post(
      `https://mern-ecommerce-stripe.onrender.com/checkout`,
      {
        carts,
      }
    );
    const data = await res.data;
    console.log(data);
    window.location.href = data.url;
  };

  return (
    <div className="shopping-cart">
      <h1 className="title">Shopping cart</h1>
      {carts.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {carts.map((cart) => (
            <div className="container-cart" key={cart.id}>
              <div className="cart-info">
                {/* left */}
                <div className="left-info">
                  <div className="img">
                    <img src={cart.image} alt="" />
                  </div>
                  <div className="info">
                    <h1 className="title">{cart.title}</h1>
                    <span>${cart.price}</span>
                    <div className="btn">
                      <button onClick={() => handleDecrease(cart)}>-</button>
                      <button className="quantity">{cart.quantity}</button>
                      <button onClick={() => handleIncrease(cart)}>+</button>
                    </div>
                  </div>
                </div>
                {/* right */}
                <div className="right-info">
                  <h2 className="price">
                    ${(cart.price * cart.quantity).toFixed(2)}
                  </h2>
                  <div
                    onClick={() => handleRemoveFromCart(cart)}
                    className="icon"
                  >
                    <i className="icon-delete">
                      <FaTrash />
                    </i>
                    <button>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="total">
            <div className="total-bill">
              <h1 className="total-title">Total:</h1>
              <span className="total-price">${totalPriceItem.toFixed(2)}</span>
            </div>
            <button disabled={disableButton} onClick={handleCheckOut}>
              Procee to checkout
            </button>
            <Link to="/">Continue to Shopping</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
