import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Card, Button, Badge } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (added) {
      const timer = setTimeout(() => setAdded(false), 2000);
      return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
    }
  }, [added]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAdded(true);
  };

  return (
    <Card className="my-3" style={{ width: '100%' }}>
      <Card.Img variant="top" src={product.images} alt={`Imagen de ${product.name}`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>

        {/* Enlace para ver los detalles */}
        <Link to={`/item/${product.id}`}>
          <Button variant="info" className="w-100 mb-2" aria-label={`Ver detalles de ${product.name}`}>
            Ver detalles
          </Button>
        </Link>

        {/* Botón para agregar al carrito */}
        <Button 
          variant={product.stock <= 0 ? 'secondary' : 'primary'} 
          className="w-100 mb-2" 
          onClick={() => handleAddToCart(product)} 
          disabled={product.stock <= 0}
          aria-label={`Agregar ${product.name} al carrito`}
        >
          {added ? '¡Agregado!' : 'Agregar al Carrito'}
        </Button>

        {/* Mostrar mensaje si está agotado */}
        {product.stock <= 0 && (
          <Badge pill bg="danger" className="mt-2">
            Agotado
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

