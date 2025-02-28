import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CartWidget from './components/CartWidget';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation"; // Asegúrate de importar el componente

const App = () => {
  // Define el estado para orderId, cartItems y totalPrice
  const [orderId, setOrderId] = useState(null); // Asegúrate de definir el estado
  const [cartItems, setCartItems] = useState([]); // Suponiendo que estos también son parte del estado
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <>
      <NavBar />
     
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:id" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Aquí pasas los valores del estado al componente Confirmation */}
        <Route path="/confirmation" element={<Confirmation orderId={orderId} cartItems={cartItems} totalPrice={totalPrice} />} />
      </Routes>
    </>
  );
};

export default App;
