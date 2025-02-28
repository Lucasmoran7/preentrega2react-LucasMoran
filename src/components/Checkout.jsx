// src/components/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Form, Button, Alert } from "react-bootstrap";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  // Estado para los datos del comprador
  const [buyerData, setBuyerData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    confirmEmail: "",
  });

  // Calcula el total a partir del carrito
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    console.log("Contenido del carrito:", cart);
    // Si el carrito está vacío, redirige al inicio
    if (!cart || cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, lastName, phone, email, confirmEmail } = buyerData;
    if (!name || !lastName || !phone || !email || !confirmEmail) {
      setError("Por favor, complete todos los campos.");
      return false;
    }
    if (email !== confirmEmail) {
      setError("Los correos electrónicos no coinciden.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      const order = {
        buyer: {
          name: buyerData.name,
          lastName: buyerData.lastName,
          phone: buyerData.phone,
          email: buyerData.email,
        },
        items: cart,
        total: totalPrice,
        date: new Date(),
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      clearCart();
      navigate(`/confirmation/${docRef.id}`);
    } catch (err) {
      console.error("Error al finalizar la compra:", err);
      setError("Hubo un error al procesar la compra.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-container container mt-5">
      <h2>Checkout</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={buyerData.name}
            onChange={handleChange}
            placeholder="Ingrese su nombre"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={buyerData.lastName}
            onChange={handleChange}
            placeholder="Ingrese su apellido"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={buyerData.phone}
            onChange={handleChange}
            placeholder="Ingrese su teléfono"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={buyerData.email}
            onChange={handleChange}
            placeholder="Ingrese su email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmEmail">
          <Form.Label>Confirmar Email</Form.Label>
          <Form.Control
            type="email"
            name="confirmEmail"
            value={buyerData.confirmEmail}
            onChange={handleChange}
            placeholder="Confirme su email"
          />
        </Form.Group>

        <h4>Total: ${totalPrice}</h4>
        <Button variant="success" type="submit" disabled={isProcessing}>
          {isProcessing ? "Procesando..." : "Finalizar Compra"}
        </Button>
      </Form>
    </div>
  );
};

export default Checkout;
