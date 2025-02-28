import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import ItemDetail from "./ItemDetail";
import { Spinner, Alert } from "react-bootstrap"; // Importa Spinner y Alert de React Bootstrap

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [invalidItem, setInvalidItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Añadir estado de error

  useEffect(() => {
    setLoading(true);
    setError(null); // Reiniciar error cuando se hace una nueva solicitud

    const docRef = doc(db, "products", id);

    getDoc(docRef)
      .then((res) => {
        if (res.exists()) {
          setProduct({ id: res.id, ...res.data() });
        } else {
          setInvalidItem(true);
        }
      })
      .catch((error) => {
        console.error("Error obteniendo el producto:", error);
        setError(`Ocurrió un error al cargar el producto: ${error.message}`);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center" aria-live="assertive"> {/* Añadido aria-live */}
        <Spinner animation="border" variant="primary" />
        <p>Cargando el producto...</p>
      </div>
    );
  }

  if (invalidItem) {
    return (
      <div className="text-center">
        <h2>Este producto no existe o ha sido removido.</h2>
        <Link to="/" className="btn btn-dark mt-3">
          Volver a Home
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <Alert variant="danger" aria-live="assertive">{error}</Alert> {/* Añadido aria-live */}
        <Link to="/" className="btn btn-dark mt-3">
          Volver a Home
        </Link>
      </div>
    );
  }

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;

