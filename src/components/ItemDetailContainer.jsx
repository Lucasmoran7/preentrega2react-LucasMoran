import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Asegúrate de que la ruta es correcta
import { products } from '../data/products'; // Importa los productos

const ItemDetailContainer = () => {
  const { id } = useParams(); // Obtén el ID del producto desde la URL
  const { addToCart } = useCart(); // Accede a la función addToCart desde el contexto
  const [product, setProduct] = useState(null); // Estado para almacenar el producto

  // Buscar el producto según el ID
  useEffect(() => {
    const foundProduct = products.find(product => product.id === parseInt(id)); // Busca el producto por ID
    if (foundProduct) {
      setProduct(foundProduct); // Establece el producto en el estado
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



