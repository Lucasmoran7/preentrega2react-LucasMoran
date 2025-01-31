import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

const categories = ['moda', 'electrodomésticos', 'herramientas', 'automotor', 'alimentos'];

const NavBar = () => {
  const { cart } = useCart(); 
  const totalItems = cart.length; 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Zafira</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {categories.map((category) => (
              <li className="nav-item" key={category}>
                <Link className="nav-link" to={`/category/${category.toLowerCase()}`}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex">
            <Link to="/cart" className="nav-link">
              Carrito {totalItems > 0 && `(${totalItems})`} {/* Muestra el número de productos */}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

