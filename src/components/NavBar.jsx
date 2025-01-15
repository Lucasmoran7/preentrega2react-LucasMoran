import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Mi Tienda</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Categoría 1</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Categoría 2</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;


