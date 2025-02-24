import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [removeQuantity, setRemoveQuantity] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); // Estado para total
  const navigate = useNavigate(); // Para redirigir al checkout

  // Calcular el total del carrito cada vez que el carrito cambie
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total); // Actualiza el total
  }, [cart]); // Recalcular total si cambia el carrito

  const handleRemove = (itemId) => {
    const quantity = removeQuantity[itemId] || 0;
    if (quantity > 0) {
      removeFromCart(itemId, quantity);
      setRemoveQuantity((prev) => ({ ...prev, [itemId]: "" }));
    }
  };

  const handleQuantityChange = (e, itemId) => {
    const value = parseInt(e.target.value) || 0;
    setRemoveQuantity((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleCheckout = () => {
    navigate("/checkout"); // Redirige al checkout
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.images} alt={item.name} className="product-images" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={removeQuantity[item.id] || item.quantity}
                      onChange={(e) => handleQuantityChange(e, item.id)}
                    />
                    <button onClick={() => handleRemove(item.id)}>Eliminar</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice}</h3> {/* Mostrar el total calculado */}
          <button onClick={handleCheckout} className="btn btn-primary">
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
