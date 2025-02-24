import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart } = useCart();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!name || !surname || !phone || !email || !repeatEmail) {
      setError("Por favor complete todos los campos.");
      return;
    }

    // Validar que los correos coincidan
    if (email !== repeatEmail) {
      setError("Los correos no coinciden.");
      return;
    }

    // Validar formato del teléfono (solo números, 7-15 caracteres)
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      setError("Ingrese un número de teléfono válido (solo números, entre 7 y 15 dígitos).");
      return;
    }

    setError("");
    setSuccess(true);

    // Simular envío de la orden (podrías conectarlo con Firebase aquí)
    setTimeout(() => {
      navigate("/confirmation");
    }, 2000); // Redirige después de 2 segundos
  };

  return (
    <div className="container mt-5">
      <h1>Finalizar compra</h1>

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <h3>Items en el carrito:</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
              </li>
            ))}
          </ul>

          <h4>Total: ${calculateTotal()}</h4>

          {success ? (
            <p className="text-success">✅ Compra realizada con éxito. Redirigiendo...</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="surname" className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="repeatEmail" className="form-label">Repetir correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="repeatEmail"
                  value={repeatEmail}
                  onChange={(e) => setRepeatEmail(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-danger">{error}</p>}

              <button type="submit" className="btn btn-primary">Finalizar compra</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;

