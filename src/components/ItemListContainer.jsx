import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

const ItemListContainer = () => {
  const { id } = useParams(); // Corregido: capturar `id` en vez de `categoryName`
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    console.log("Categoría seleccionada:", id);
    
    const filtered = id
      ? products.filter(product => product.category.toLowerCase() === id.toLowerCase())
      : products;
    
    setFilteredProducts(filtered);
  }, [id]); // Se ejecuta cuando cambia la categoría

  return (
    <div className="container mt-4">
      {id && <h2 className="text-center">Categoría: {id}</h2>}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div className="col-md-4" key={product.id}>
              <div className="card mb-4">
                <img src={product.images} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  {/* Link para ver detalles */}
                  <Link to={`/item/${product.id}`} className="btn btn-primary">
                    Ver Detalle
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
