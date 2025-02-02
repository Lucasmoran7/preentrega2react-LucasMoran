import React from 'react';
import { useCart } from '../context/CartContext'; 
const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); 

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={product.images} alt={`Imagen de ${product.name}`} className="product-image" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <button 
          className="btn btn-primary" 
          onClick={() => addToCart(product)} 
          aria-label={`Agregar ${product.name} al carrito`}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

