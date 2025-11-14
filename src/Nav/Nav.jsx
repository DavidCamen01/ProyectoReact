import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';
import './Nav.css';

export default function NavApp() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" 
         style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Second Chance</Link>

        {/* Botón hamburguesa para móvil */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links del navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/carrito">Carrito</Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link fw-bold text-primary">
                    {user.email}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Registro</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}