import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity } // Aumenta la cantidad
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: item.quantity }];
      }
    });
  };

  const removeFromCart = (itemId, quantityToRemove = null) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - (quantityToRemove || item.quantity) }
            : item
        )
        .filter((item) => item.quantity > 0); // Elimina productos con cantidad 0
    });
  };
  

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
