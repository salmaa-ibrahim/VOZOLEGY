import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, shipping, grandTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty">
        <h2>Your Cart is Empty</h2>
        <Link to="/" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-row">
              <img src={item.image_url} alt={item.name} />
              <div className="cart-row__details">
                <h3>{item.name}</h3>
                <p>{item.flavor}</p>
                <p className="price">{item.price} LE</p>
                <div className="qty-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
        </div>
        
        <div className="cart-summary-box">
          <h3>Order Summary</h3>
          <div className="summary-line"><span>Subtotal</span><span>{subtotal} LE</span></div>
          <div className="summary-line"><span>Shipping</span><span>{shipping} LE</span></div>
          <div className="summary-line total"><span>Grand Total</span><span>{grandTotal} LE</span></div>
          <Link to="/checkout" className="btn-checkout-full">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;