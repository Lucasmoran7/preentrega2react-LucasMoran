import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Asegúrate de que la ruta es correcta


const ItemDetailContainer = () => {
  const { id } = useParams(); // Obtén el ID del producto desde la URL
  const { addToCart } = useCart(); // Accede a la función addToCart desde el contexto

  // Aquí podrías obtener el producto usando el ID, por ejemplo desde una API o un array de productos
  const product = { id, name: 'Producto Ejemplo', price: 100, image: 'url-imagen' }; // Ejemplo de producto

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


