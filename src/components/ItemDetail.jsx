import React from "react";
import { useCart } from "../context/CartContext";
import ItemCount from "./ItemCount";

const ItemDetail = ({ product }) => {
  const { addToCart } = useCart();

  // Verificación de si el producto existe
  if (!product) {
    return <p>Cargando producto...</p>; // Evita errores si el producto es undefined
  }

  // Manejo de agregar al carrito con la cantidad seleccionada
  const handleAddToCart = (quantity) => {
    console.log("Producto a agregar:", { ...product, quantity });
    addToCart({ ...product, quantity }); // Agrega el producto con la cantidad seleccionada
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2 className="mb-3">{product.name}</h2>
        {/* Imagen del producto con atributos de accesibilidad */}
        <img 
          src={product.images} 
          alt={`Imagen de ${product.name}`} 
          className="img-fluid mb-3 rounded"
          style={{ maxWidth: "500px", height: "auto", objectFit: "contain" }} // Limita el tamaño máximo y asegura que la imagen mantenga proporciones
          loading="lazy" // Carga perezosa para mejorar el rendimiento
        />
        <p><strong>Precio:</strong> ${product.price}</p>
        <p><strong>Descripción:</strong> {product.description}</p>
        
        {/* Validación de stock: Si hay stock disponible, permite agregar al carrito */}
        {product.stock > 0 ? (
          <ItemCount 
            stock={product.stock} 
            initial={1} 
            onAdd={handleAddToCart} 
            aria-label={`Agregar ${product.name} al carrito`} 
          />
        ) : (
          <p className="text-danger" aria-live="assertive">Lo siento, este producto está agotado.</p> // Anuncio para tecnologías asistivas
        )}
      </div>
    </div>
  );
};

export default ItemDetail;

