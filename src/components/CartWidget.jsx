import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, { quantity }) => acc + quantity, 0);

  return (
    <div 
      className="cart-widget d-flex align-items-center text-white" 
      role="button" 
      aria-label="Carrito de compras" 
      tabIndex="0"
    >
      <FaShoppingCart size={24} />
      {totalItems > 0 && (
        <span className="cart-count ms-2">{totalItems}</span>
      )}
    </div>
  );
};

export default CartWidget;

