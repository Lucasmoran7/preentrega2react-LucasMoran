import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

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
        setError("Ocurrió un error al cargar los productos.");
      })
      .finally(() => setLoading(false));
  }, [id]); // Se ejecuta cuando cambia la categoría `id`

  if (loading) {
    return <p className="text-center">Cargando productos...</p>;
  }

  return (
    <div className="container mt-4">
      {error && (
        <div className="alert alert-danger text-center">
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
                  src={product.images || "default-image.jpg"} // Imagen predeterminada en caso de no tener una
                  className="card-img-top"
                  alt={product.name}
                  aria-label={`Imagen de ${product.name}`}
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

