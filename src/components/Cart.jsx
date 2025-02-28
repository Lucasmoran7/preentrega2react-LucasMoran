import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [removeQuantity, setRemoveQuantity] = useState({});
  const navigate = useNavigate();

  // Calcula el total del carrito
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (itemId) => {
    const quantity = removeQuantity[itemId] || 0;
    if (quantity > 0) {
      removeFromCart(itemId, quantity);
      setRemoveQuantity((prev) => ({ ...prev, [itemId]: "" }));
    } else {
      removeFromCart(itemId);
    }
  };

  const handleQuantityChange = (e, itemId) => {
    const value = Math.max(parseInt(e.target.value) || 1, 1);
    if (value !== removeQuantity[itemId]) {
      setRemoveQuantity((prev) => ({ ...prev, [itemId]: value }));
      updateQuantity(itemId, value);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    try {
      // Crea la orden en Firebase
      const docRef = await addDoc(collection(db, "orders"), {
        items: cart,
        total: totalPrice,
        date: new Date(),
      });
      // Vacía el carrito
      clearCart();
      // Redirige a la página de confirmación con el ID de la orden
      navigate(`/confirmation/${docRef.id}`);
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert("Hubo un error al procesar la compra.");
    }
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
                  <button onClick={() => handleRemove(item.id)}>Eliminar</button>
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={removeQuantity[item.id] || item.quantity}
                      onChange={(e) => handleQuantityChange(e, item.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice}</h3>
          <button onClick={clearCart} className="btn btn-danger">
            Vaciar carrito
          </button>
          {/* Aquí se muestra siempre el botón de Finalizar Compra */}
          <button onClick={handleCheckout} className="btn btn-primary">
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
