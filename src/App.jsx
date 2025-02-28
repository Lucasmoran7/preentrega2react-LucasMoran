import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";

const App = () => {
  // Estados para la orden
  const [orderId, setOrderId] = useState(null);
  const [cartItems, setCartItems] = useState([]); 
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  // Función para manejar el checkout
  // Se espera que Checkout invoque onCheckout(items, total)
  const handleCheckout = (items, total) => {
    // Aquí, en un flujo real, obtendrías el orderId al guardar la orden en Firebase.
    // Por ejemplo, const orderIdValue = docRef.id;
    const orderIdValue = "order123"; // Valor de ejemplo; reemplázalo por el ID real
    setOrderId(orderIdValue);
    setCartItems(items);
    setTotalPrice(total);

    // Redirige a la página de confirmación utilizando el orderId en la URL
    navigate(`/confirmation/${orderIdValue}`);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:id" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout onCheckout={handleCheckout} />} />
        {/* Se pasa orderId, cartItems y totalPrice al componente Confirmation */}
        <Route 
          path="/confirmation/:orderId" 
          element={
            <Confirmation 
              orderId={orderId} 
              cartItems={cartItems} 
              totalPrice={totalPrice} 
            />
          } 
        />
      </Routes>
    </>
  );
};

export default App;
