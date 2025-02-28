import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { Spinner, Alert } from "react-bootstrap"; // Importar Spinner y Alert de React Bootstrap

const ItemListContainer = () => {
  const { id } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Conectar con la colección de Firebase
    const productsCollection = id
      ? query(collection(db, "products"), where("category", "==", id))
      : collection(db, "products");

    getDocs(productsCollection)
      .then((res) => {
        const list = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFilteredProducts(list);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setError(`Ocurrió un error al cargar los productos: ${error.message}`);
      })
      .finally(() => setLoading(false));
  }, [id]); // Se ejecuta cuando cambia la categoría `id`

  if (loading) {
    return (
      <div className="text-center" aria-live="assertive">
        <Spinner animation="border" variant="primary" />
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {error && (
        <div className="alert alert-danger text-center" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      {id && <h2 className="text-center my-4">Categoría: {id}</h2>}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card shadow-sm">
                <img
                  src={product.images || "/default-placeholder.jpg"} // Imagen predeterminada más descriptiva
                  className="card-img-top"
                  alt={product.name}
                  aria-label={`Imagen de ${product.name}`}
                  loading="lazy" // Añadido para mejorar rendimiento de imágenes
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  {/* Link para ver detalles */}
                  <Link
                    to={`/item/${product.id}`}
                    className="btn btn-primary"
                    aria-label={`Ver detalles de ${product.name}`}
                  >
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
