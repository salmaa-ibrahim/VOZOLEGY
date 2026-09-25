// import React, { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Load from localStorage for guest cart
//   useEffect(() => {
//     const saved = localStorage.getItem('vozol_cart');
//     if (saved) setCartItems(JSON.parse(saved));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('vozol_cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     setCartItems(prev => {
//       const existing = prev.find(item => item.id === product.id);
//       if (existing) {
//         return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCartItems(prev => prev.filter(item => item.id !== id));
//   };

//   const updateQuantity = (id, delta) => {
//     setCartItems(prev => prev.map(item => {
//       if (item.id === id) {
//         const newQty = Math.max(1, item.quantity + delta);
//         return { ...item, quantity: newQty };
//       }
//       return item;
//     }));
//   };

//   const clearCart = () => setCartItems([]);

//   const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
//   const shipping = subtotal > 0 ? 100 : 0; // Placeholder, should be from site settings
//   const grandTotal = subtotal + shipping;

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal, shipping, grandTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);









import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "vozol_cart";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  /*
   * Load cart from localStorage
   */
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(
        CART_STORAGE_KEY
      );

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      setCartItems([]);
    }
  }, []);

  /*
   * Save cart to localStorage
   */
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cartItems]);

  /*
   * Add product to cart
   */
  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error(
        "Cannot add product without an id:",
        product
      );

      return;
    }

    setCartItems((previousItems) => {
      const existingItem =
        previousItems.find(
          (item) =>
            item.id === product.id
        );

      if (existingItem) {
        return previousItems.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    Number(
                      item.quantity || 1
                    ) + 1,
                }
              : item
        );
      }

      return [
        ...previousItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  /*
   * Remove product
   */
  const removeFromCart = (id) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item.id !== id
      )
    );
  };

  /*
   * Update product quantity
   */
  const updateQuantity = (
    id,
    delta
  ) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const currentQuantity =
          Number(
            item.quantity || 1
          );

        const newQuantity = Math.max(
          1,
          currentQuantity + delta
        );

        return {
          ...item,
          quantity: newQuantity,
        };
      })
    );
  };

  /*
   * Clear cart
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /*
   * Total number of products
   */
  const cartCount = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 1),
    0
  );

  /*
   * Subtotal
   */
  const subtotal = cartItems.reduce(
    (total, item) => {
      const price = Number(
        item.price || 0
      );

      const quantity = Number(
        item.quantity || 1
      );

      return (
        total +
        price * quantity
      );
    },
    0
  );

  /*
   * Default shipping
   *
   * This is only the current
   * temporary cart calculation.
   * Checkout has its own shipping
   * selection.
   */
  const shipping =
    subtotal > 0 ? 100 : 0;

  /*
   * Grand total
   */
  const grandTotal =
    subtotal + shipping;

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    subtotal,
    shipping,
    grandTotal,
  };

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
};

/*
 * useCart hook
 */
export const useCart = () => {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
};

export default CartContext;
