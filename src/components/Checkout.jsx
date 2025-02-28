import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../services/firebase";  // Asegúrate de que la ruta apunte a la carpeta correcta

const Checkout = ({ cart, totalPrice, setCart }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");

  // Función para validar que los correos electrónicos coincidan
  const validateMail = (email, repeatEmail) => {
    if (email !== repeatEmail) {
      alert("Los correos electrónicos no coinciden.");
      return false;
    }
    return true;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    // Validar que los correos coincidan
    if (!validateMail(email, repeatEmail)) {
      return; // Si los correos no coinciden, no se sigue con la compra
    }

    // Crear la orden
    const order = {
      name,
      surname,
      phone,
      email,
      products: cart,
      total: totalPrice,
      date: new Date().toISOString(),
    };

    try {
      // Guardar la orden en Firebase
      const docRef = await addDoc(collection(db, "orders"), order);
      alert(`Compra realizada con éxito! ID de la orden: ${docRef.id}`);
      setCart([]);  // Vaciar el carrito después de la compra
    } catch (error) {
      console.error("Error al guardar la orden: ", error);
    }
  };

  // Función para vaciar el carrito
  const handleClearCart = () => {
    setCart([]);  // Vaciar el carrito
  };

  return (
    <div className="checkout-container">
      <h2>Formulario de Compra</h2>
      <form onSubmit={handleCheckout} className="checkout-form">
        <input 
          type="text" 
          placeholder="Nombre" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />
        <input 
          type="text" 
          placeholder="Apellido" 
          value={surname} 
          onChange={(e) => setSurname(e.target.value)} 
          required
        />
        <input 
          type="tel" 
          placeholder="Teléfono" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required
        />
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="email" 
          placeholder="Repetir correo electrónico" 
          value={repeatEmail} 
          onChange={(e) => setRepeatEmail(e.target.value)} 
          required
        />
        <button type="submit">Finalizar Compra</button>
      </form>
      
      {/* Botón para vaciar el carrito */}
      <button onClick={handleClearCart} className="clear-cart-button">Vaciar Carrito</button>
    </div>
  );
};

export default Checkout;
