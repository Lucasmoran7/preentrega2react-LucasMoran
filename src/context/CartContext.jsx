import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    if (item.quantity <= 0) {
      alert("La cantidad debe ser mayor que 0");
      return; // No agrega productos con cantidad 0 o negativa
    }

    setCart((prevCart) => {
      if (item.quantity > item.stock) {
        alert(`No hay suficiente stock para agregar ${item.quantity} unidades.`);
        return prevCart;
      }

      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        if (existingItem.quantity + item.quantity > item.stock) {
          alert(`No hay suficiente stock para agregar más de este producto.`);
          return prevCart;
        }

        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: item.quantity }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);  // Vaciar todo el carrito
  };
  
 
  const removeFromCart = (itemId, quantityToRemove = null) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: quantityToRemove ? item.quantity - quantityToRemove : 0,
              }
            : item
        )
        .filter((item) => item.quantity > 0); // Eliminar productos con cantidad 0
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      alert("La cantidad debe ser mayor que 0");
      return; // No se permite actualizar a 0 o valores negativos
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartCount, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

