import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../utils/mockData"; // Simulación de la API
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Buscando producto con ID: ${id}`);
        const fetchedProduct = await getProductById(id); // Espera la respuesta

        if (fetchedProduct) {
          setProduct(fetchedProduct);
          console.log("Producto encontrado:", fetchedProduct);
        } else {
          console.error("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Cargando el producto...</p>;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;
