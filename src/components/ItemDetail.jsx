import React from "react";
import { useCart } from "../context/CartContext";
import ItemCount from "./ItemCount";

const ItemDetail = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) {
    return <p>Cargando producto...</p>; // Evita errores si product es undefined
  }

  const handleAddToCart = (quantity) => {
    console.log("Producto a agregar:", { ...product, quantity });
    addToCart({ ...product, quantity }); // Agrega el producto con la cantidad seleccionada
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2 className="mb-3">{product.name}</h2>
        <img 
          src={product.images} 
          alt={`Imagen de ${product.name}`} 
          className="img-fluid mb-3 rounded"
          style={{ maxWidth: "500px", height: "auto", objectFit: "contain" }} // Limita el tamaño máximo y asegura que la imagen mantenga proporciones
        />
        <p><strong>Precio:</strong> ${product.price}</p>
        <p><strong>Descripción:</strong> {product.description}</p>
        
        {/* Validación de stock: Si hay stock disponible, permite agregar al carrito */}
        {product.stock > 0 ? (
          <ItemCount 
            stock={product.stock} 
            initial={1} 
            onAdd={handleAddToCart} 
          />
        ) : (
          <p className="text-danger">Lo siento, este producto está agotado.</p>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;

