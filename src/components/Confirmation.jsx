import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../services/firebase";  // Firebase
import { doc, getDoc } from "firebase/firestore";

const Confirmation = () => {
  const { orderId } = useParams(); // Obtener el ID de la orden de la URL
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          setOrder(orderSnap.data());
        } else {
          console.log("No se encontró la orden.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error al obtener la orden:", error);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (!order) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="confirmation-container">
      <h2>¡Compra exitosa!</h2>
      <p>Tu compra ha sido procesada con éxito. Aquí están los detalles:</p>
      <h4>Orden ID: {orderId}</h4>
      <h5>Total: ${order.total}</h5>
      <h6>Fecha: {new Date(order.date.seconds * 1000).toLocaleString()}</h6>
      <div>
        <h5>Productos:</h5>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>{item.name} - ${item.price} x {item.quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Confirmation;
