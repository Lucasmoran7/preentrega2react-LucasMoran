import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from "./CartWidget";
import { useCart } from '../context/CartContext'; 

const categories = ['moda', 'electrodomésticos', 'herramientas', 'automotor', 'alimentos'];

const NavBar = () => {
  const { cart, getCartCount } = useCart(); 
  const totalItems = getCartCount(); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Zafira</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {categories.map((category) => (
              <li className="nav-item" key={category}>
                <Link 
                  className="nav-link" 
                  to={`/category/${category.toLowerCase()}`}
                  aria-label={`Ver productos de ${category}`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ms-auto d-flex align-items-center">
            <Link 
              to="/cart" 
              className="nav-link text-white d-flex align-items-center" 
              aria-label="Ir al carrito de compras"
            >
              <CartWidget />
              {totalItems > 0 && <span className="badge bg-primary ms-2">{totalItems}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

