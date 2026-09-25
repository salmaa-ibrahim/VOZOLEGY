// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useCart } from '../../contexts/CartContext';
// import './CartDrawer.css';

// const CartDrawer = ({ isOpen, onClose }) => {
//   const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, shipping, grandTotal } = useCart();

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div 
//             className="drawer-overlay" 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={onClose}
//           />
//           <motion.div 
//             className="drawer drawer--right"
//             initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
//             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//           >
//             <div className="drawer__header">
//               <h2>Your Cart</h2>
//               <button onClick={onClose} className="drawer__close">✕</button>
//             </div>
            
//             <div className="drawer__body">
//               {cartItems.length === 0 ? (
//                 <p className="cart-empty">Your cart is empty.</p>
//               ) : (
//                 cartItems.map(item => (
//                   <div key={item.id} className="cart-item">
//                     <img src={item.image_url} alt={item.name} className="cart-item__img" />
//                     <div className="cart-item__info">
//                       <h4>{item.name}</h4>
//                       <p>Price: {item.price} LE</p>
//                       <p>Flavor: {item.flavor}</p>
//                       <div className="cart-item__controls">
//                         <button onClick={() => updateQuantity(item.id, -1)}>-</button>
//                         <span>{item.quantity}</span>
//                         <button onClick={() => updateQuantity(item.id, 1)}>+</button>
//                       </div>
//                     </div>
//                     <button className="cart-item__delete" onClick={() => removeFromCart(item.id)}>Delete</button>
//                   </div>
//                 ))
//               )}
//             </div>

//             {cartItems.length > 0 && (
//               <div className="drawer__footer">
//                 <div className="cart-summary">
//                   <div><span>Total</span><span>{subtotal} LE</span></div>
//                   <div><span>Shipping</span><span>{shipping} LE</span></div>
//                   <div className="cart-summary__grand"><span>Grand Total</span><span>{grandTotal} LE</span></div>
//                 </div>
//                 <div className="drawer__actions">
//                   <button className="btn-clear" onClick={clearCart}>Clear</button>
//                   <button className="btn-checkout" onClick={() => { onClose(); window.location.href='/checkout'; }}>Checkout</button>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CartDrawer;













import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import "./CartDrawer.css";

const CartDrawer = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shipping,
    grandTotal,
  } = useCart();

  const handleCheckout = () => {
    /*
     * Don't allow checkout with an empty cart.
     */
    if (
      !cartItems ||
      cartItems.length === 0
    ) {
      return;
    }

    /*
     * Close the drawer first.
     */
    onClose();

    /*
     * Navigate using React Router.
     *
     * IMPORTANT:
     * Do NOT use:
     * window.location.href = "/checkout"
     *
     * because that reloads the whole application.
     */
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* =========================================
              OVERLAY
          ========================================== */}

          <motion.div
            className="drawer-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
          />

          {/* =========================================
              DRAWER
          ========================================== */}

          <motion.div
            className="drawer drawer--right"
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
          >

            {/* =======================================
                HEADER
            ======================================== */}

            <div className="drawer__header">

              <h2>
                Your Cart
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="drawer__close"
                aria-label="Close cart"
              >
                ✕
              </button>

            </div>


            {/* =======================================
                BODY
            ======================================== */}

            <div className="drawer__body">

              {cartItems.length === 0 ? (

                <div className="cart-empty">

                  <p>
                    Your cart is empty.
                  </p>

                </div>

              ) : (

                cartItems.map((item) => {

                  const quantity =
                    Number(
                      item.quantity || 1
                    );

                  const price =
                    Number(
                      item.price || 0
                    );

                  return (
                    <div
                      key={item.id}
                      className="cart-item"
                    >

                      {/* PRODUCT IMAGE */}

                      <img
                        src={
                          item.image_url ||
                          item.image ||
                          "/images/products/placeholder.png"
                        }
                        alt={
                          item.name ||
                          "Product"
                        }
                        className="cart-item__img"
                      />


                      {/* PRODUCT INFO */}

                      <div className="cart-item__info">

                        <h4>
                          {item.name}
                        </h4>

                        <p>
                          Price:{" "}
                          {price} LE
                        </p>

                        {item.flavor && (
                          <p>
                            Flavor:{" "}
                            {item.flavor}
                          </p>
                        )}


                        {/* QUANTITY */}

                        <div className="cart-item__controls">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                -1
                              )
                            }
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>

                          <span>
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                1
                              )
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>

                        </div>

                      </div>


                      {/* DELETE */}

                      <button
                        type="button"
                        className="cart-item__delete"
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>
                  );
                })
              )}

            </div>


            {/* =======================================
                FOOTER
            ======================================== */}

            {cartItems.length > 0 && (

              <div className="drawer__footer">

                {/* CART SUMMARY */}

                <div className="cart-summary">

                  <div>
                    <span>
                      Total
                    </span>

                    <span>
                      {subtotal} LE
                    </span>
                  </div>


                  <div>
                    <span>
                      Shipping
                    </span>

                    <span>
                      {shipping} LE
                    </span>
                  </div>


                  <div className="cart-summary__grand">

                    <span>
                      Grand Total
                    </span>

                    <span>
                      {grandTotal} LE
                    </span>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="drawer__actions">

                  <button
                    type="button"
                    className="btn-clear"
                    onClick={clearCart}
                  >
                    Clear
                  </button>


                  <button
                    type="button"
                    className="btn-checkout"
                    onClick={
                      handleCheckout
                    }
                  >
                    Checkout
                  </button>

                </div>

              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
