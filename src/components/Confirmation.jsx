import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const { orderId, cartItems, totalPrice } = location.state || {};

  return (
    <div className="confirmation-container">
      <h1>¡Compra realizada con éxito!</h1>
      <p>Gracias por tu compra. Te enviaremos una confirmación a tu correo.</p>
      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>Total:</strong> ${totalPrice}</p>
      <p><strong>Items:</strong> {cartItems?.map(item => (
        <div key={item.name}>{item.name} x {item.quantity}</div>
      ))}</p>
    </div>
  );
};

export default Confirmation;
