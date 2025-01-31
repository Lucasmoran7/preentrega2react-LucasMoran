import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // ✅ Importamos el contexto
import App from './App'; // ✅ Importamos la estructura principal de la app
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CartProvider> {/* ✅ Ahora envuelve toda la app */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);


