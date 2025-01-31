import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; // Usamos el hook del contexto

const CartWidget = () => {
  const { cart, addToCart, getCartCount } = useCart(); // Accedemos al carrito y funciones
  const [message, setMessage] = useState(''); // Mensaje temporal para el agregado

  const handleAddToCart = () => {
    // Llamamos a la función addToCart desde el contexto para agregar un producto
    const exampleProduct = { id: 1, name: 'Producto Ejemplo', price: 100, images: 'url-de-imagen' };
    addToCart(exampleProduct);  // Usamos addToCart que proviene del contexto
    setMessage('Producto agregado');
    setTimeout(() => setMessage(''), 2000); // El mensaje desaparece después de 2 segundos
  };

  return (
    <div className="d-flex align-items-center text-white">
      <FaShoppingCart size={24} />
      <span className="ms-2">{cart.length > 0 ? getCartCount() : 'Carrito vacío'}</span>
      <button className="btn btn-outline-light ms-2" onClick={handleAddToCart}>
        Agregar Producto
      </button>
      {message && <span className="ms-2 text-success">{message}</span>} {/* Mensaje de éxito */}
    </div>
  );
};

export default CartWidget;

