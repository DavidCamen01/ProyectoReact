import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavApp from './Nav/Nav';
import FooterApp from './Footer/footerapp';
import HomeApp from './Home/Homeapp';
import ProductosApp from './Productos/Productos';
import ProductoDetalleApp from './Productos/Productosdetallados';
import CarritoApp from './Nav/CarritoApp';
import LoginApp from './Login/login';
import RegistApp from './Registro/Registro';
import { AuthProvider } from './Login/AuthContext';

export default function IndexApp(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavApp />
        <Routes>
          <Route path='/' element={<HomeApp />} />
          <Route path='/productos' element={<main className="container my-4"><ProductosApp /></main>} />
          <Route path='/producto/:id' element={<main className="container my-4"><ProductoDetalleApp /></main>} />
          <Route path='/carrito' element={<main className="container my-4"><CarritoApp /></main>} />
          <Route path='/login' element={<main className="container my-4"><LoginApp /></main>} />
          <Route path='/registro' element={<main className="container my-4"><RegistApp /></main>} />
        </Routes>
        <FooterApp />
      </BrowserRouter>
    </AuthProvider>
  );
}