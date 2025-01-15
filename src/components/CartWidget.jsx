import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';  // Asegúrate de que react-icons esté instalado

const CartWidget = () => {
  return (
    <div className="d-flex align-items-center text-white">
      <FaShoppingCart size={24} />
      <span>3</span>
    </div>
  );
};

export default CartWidget;
