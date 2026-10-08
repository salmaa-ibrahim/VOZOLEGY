// import React, { createContext, useContext, useEffect, useState } from "react";

// const CartContext = createContext(null);

// const CART_STORAGE_KEY = "vozol_cart";

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   /*
//    * Load cart from localStorage
//    */
//   useEffect(() => {
//     try {
//       const savedCart = localStorage.getItem(CART_STORAGE_KEY);

//       if (savedCart) {
//         const parsedCart = JSON.parse(savedCart);

//         if (Array.isArray(parsedCart)) {
//           setCartItems(parsedCart);
//         }
//       }
//     } catch (error) {
//       console.error("Failed to load cart:", error);

//       setCartItems([]);
//     }
//   }, []);

//   /*
//    * Save cart to localStorage
//    */
//   useEffect(() => {
//     try {
//       localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
//     } catch (error) {
//       console.error("Failed to save cart:", error);
//     }
//   }, [cartItems]);

//   /*
//    * Add product to cart
//    */
//   const addToCart = (product) => {
//     if (!product || !product.id) {
//       console.error("Cannot add product without an id:", product);

//       return;
//     }

//     setCartItems((previousItems) => {
//       const existingItem = previousItems.find((item) => item.id === product.id);

//       if (existingItem) {
//         return previousItems.map((item) =>
//           item.id === product.id
//             ? {
//                 ...item,
//                 quantity: Number(item.quantity || 1) + 1,
//               }
//             : item,
//         );
//       }

//       return [
//         ...previousItems,
//         {
//           ...product,
//           quantity: 1,
//         },
//       ];
//     });
//   };

//   /*
//    * Remove product
//    */
//   const removeFromCart = (id) => {
//     setCartItems((previousItems) =>
//       previousItems.filter((item) => item.id !== id),
//     );
//   };

//   /*
//    * Update product quantity
//    */
//   const updateQuantity = (id, delta) => {
//     setCartItems((previousItems) =>
//       previousItems.map((item) => {
//         if (item.id !== id) {
//           return item;
//         }

//         const currentQuantity = Number(item.quantity || 1);

//         const newQuantity = Math.max(1, currentQuantity + delta);

//         return {
//           ...item,
//           quantity: newQuantity,
//         };
//       }),
//     );
//   };

//   /*
//    * Clear cart
//    */
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   /*
//    * Total number of products
//    */
//   const cartCount = cartItems.reduce(
//     (total, item) => total + Number(item.quantity || 1),
//     0,
//   );

//   /*
//    * Subtotal
//    */
//   const subtotal = cartItems.reduce((total, item) => {
//     const price = Number(item.price || 0);

//     const quantity = Number(item.quantity || 1);

//     return total + price * quantity;
//   }, 0);

//   /*
//    * Default shipping
//    *
//    * This is only the current
//    * temporary cart calculation.
//    * Checkout has its own shipping
//    * selection.
//    */
//   const shipping = subtotal > 0 ? 100 : 0;

//   /*
//    * Grand total
//    */
//   const grandTotal = subtotal + shipping;

//   const value = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     cartCount,
//     subtotal,
//     shipping,
//     grandTotal,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// /*
//  * useCart hook
//  */
// export const useCart = () => {
//   const context = useContext(CartContext);

//   if (!context) {
//     throw new Error("useCart must be used inside a CartProvider");
//   }

//   return context;
// };

// export default CartContext;




import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "vozol_cart";

/* =========================================================
   SHIPPING CONFIGURATION
========================================================= */

export const FREE_SHIPPING_THRESHOLD = 2500;
export const STANDARD_SHIPPING_COST = 100;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  /*
   * Load cart from localStorage
   */
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);

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
        JSON.stringify(cartItems),
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems]);

  /*
   * Add product to cart
   */
  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error(
        "Cannot add product without an id:",
        product,
      );

      return;
    }

    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 1) + 1,
              }
            : item,
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
        (item) => item.id !== id,
      ),
    );
  };

  /*
   * Update product quantity
   */
  const updateQuantity = (id, delta) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const currentQuantity = Number(
          item.quantity || 1,
        );

        const newQuantity = Math.max(
          1,
          currentQuantity + delta,
        );

        return {
          ...item,
          quantity: newQuantity,
        };
      }),
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
      total + Number(item.quantity || 1),
    0,
  );

  /*
   * Subtotal
   */
  const subtotal = cartItems.reduce(
    (total, item) => {
      const price = Number(item.price || 0);

      const quantity = Number(
        item.quantity || 1,
      );

      return total + price * quantity;
    },
    0,
  );

  /*
   * Free shipping
   *
   * Orders of 2500 LE or more
   * get free standard shipping.
   */
  const isFreeShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD;

  /*
   * Shipping
   *
   * Less than 2500 LE → 100 LE
   * 2500 LE or more → FREE
   */
  const shipping =
    subtotal > 0
      ? isFreeShipping
        ? 0
        : STANDARD_SHIPPING_COST
      : 0;

  /*
   * Grand total
   */
  const grandTotal = subtotal + shipping;

  /*
   * Amount remaining until free shipping
   */
  const amountUntilFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0,
  );

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

    isFreeShipping,

    amountUntilFreeShipping,

    FREE_SHIPPING_THRESHOLD,

    STANDARD_SHIPPING_COST,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/*
 * useCart hook
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider",
    );
  }

  return context;
};

export default CartContext;