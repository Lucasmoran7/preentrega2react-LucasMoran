import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [removeQuantity, setRemoveQuantity] = useState({}); // Para guardar la cantidad a eliminar por producto

  const handleRemove = (itemId) => {
    const quantity = removeQuantity[itemId] || 0;
    if (quantity > 0) {
      removeFromCart(itemId, quantity); // Elimina la cantidad especificada
      setRemoveQuantity((prev) => ({ ...prev, [itemId]: "" })); // Limpia el campo después de eliminar
    }
  };

  const handleQuantityChange = (e, itemId) => {
    const value = parseInt(e.target.value) || 0;
    setRemoveQuantity((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <div>
                <input
                  type="number"
                  min="1"
                  value={removeQuantity[item.id] || item.quantity} // Muestra la cantidad actual del producto o lo que el usuario quiere eliminar
                  onChange={(e) => handleQuantityChange(e, item.id)} // Actualiza el valor de cantidad
                />
                <button onClick={() => handleRemove(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
