import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 


const ItemDetailContainer = () => {
  const { id } = useParams(); 
  const { addToCart } = useCart(); 


  const product = { id, name: 'Producto Ejemplo', price: 100, image: 'url-imagen' }; 

  const handleAddToCart = () => {
    console.log('Producto agregado al carrito:', product);
    addToCart(product); // Agrega el producto al carrito
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Precio: ${product.price}</p>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
};

export default ItemDetailContainer;


