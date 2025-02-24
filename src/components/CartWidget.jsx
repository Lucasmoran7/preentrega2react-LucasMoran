import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; // Usamos el hook del contexto

const CartWidget = () => {
  const { cart } = useCart(); // Accedemos al carrito
  const totalItems = cart.length; // Obtenemos el total de items en el carrito

  return (
    <div className="d-flex align-items-center text-white">
      <FaShoppingCart size={24} />
      <span className="ms-2">{totalItems > 0 ? totalItems : 'Carrito vacío'}</span>
    </div>
  );
};

export default CartWidget;


