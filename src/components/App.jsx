import React from 'react';
import NavBar from './components/NavBar';  // Asegúrate de tener la ruta correcta
import CartWidget from './components/CartWidget';  // Lo mismo aquí
import ItemListContainer from './components/ItemListContainer';  // Y aquí

const App = () => {
  return (
    <div>
      <NavBar />
      <CartWidget />
      <ItemListContainer greeting="Bienvenido a nuestra tienda" />
    </div>
  );
};

export default App;
