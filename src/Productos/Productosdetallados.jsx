import React from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../Styles/Products.json';

export default function ProductoDetalleApp() {
  const { id } = useParams();
  const producto = productsData.find(p => p.id === parseInt(id));
  if (!producto) return <p className="text-center mt-5">Producto no encontrado.</p>;

  return (
    <div className="container text-center my-5">
      <img src={producto.imagen} alt={producto.nombre} className="img-fluid mb-3" style={{maxWidth:'400px'}} />
      <h2>{producto.nombre}</h2>
      <p className="text-muted">${producto.precio}</p>
      <Link to="/productos" className="btn btn-outline-dark mt-3">Volver</Link>
    </div>
  );
}
