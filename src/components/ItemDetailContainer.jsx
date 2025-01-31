import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import { products } from '../data/products'; 

const ItemDetailContainer = () => {
  const { id } = useParams(); 
  const { addToCart } = useCart(); 
  const [product, setProduct] = useState(null); 

  useEffect(() => {
    const foundProduct = products.find(product => product.id === parseInt(id)); 
    if (foundProduct) {
      setProduct(foundProduct); 
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Agrega el producto al carrito
    }
  };

  if (!product) return <p>Cargando...</p>; // Muestra mensaje de carga mientras se obtiene el producto

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.images} alt={product.name} style={{ width: '300px' }} /> {/* Muestra la imagen */}
      <p>{product.description}</p> {/* Muestra la descripción */}
      <p>Precio: ${product.price.toLocaleString()}</p> {/* Muestra el precio formateado */}
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
};

export default ItemDetailContainer;



