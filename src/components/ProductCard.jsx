import React from 'react';
import { useCart } from '../context/CartContext'; // Importamos el hook del contexto

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Accedemos a la función para agregar al carrito

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={product.images} alt={`Imagen de ${product.name}`} className="product-image" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <button 
          className="btn btn-primary" 
          onClick={() => addToCart(product)} // Usamos `addToCart` directamente
          aria-label={`Agregar ${product.name} al carrito`}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

