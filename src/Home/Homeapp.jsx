import React, { useState } from "react";
import { Carousel, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homeapp.css";

// Importaciones de imágenes (Asumo que Foto3 a Foto8 son los productos destacados)
import Foto1 from "../assets/img/Foto1.jpg";
import Foto2 from "../assets/img/Foto2.jpg";
import Foto3 from "../assets/img/Foto3.jpg"; // Asegúrate que esta sea la chaqueta (Producto 1)
import Foto4 from "../assets/img/Foto4.jpg"; // Pantalón Denim Estrellas (Producto 2)
import Foto5 from "../assets/img/Foto5.jpg"; // Falda Camuflaje (Producto 3)
import Foto6 from "../assets/img/Foto6.jpg"; // Camisa (Producto 4)
import Foto7 from "../assets/img/Foto7.jpg"; // Pantalón Oscuro (Producto 5)
import Foto8 from "../assets/img/Foto8.jpg"; // Sudadera (Producto 6)


// Datos de los productos (¡Ahora con las especificaciones que me pasaste!)
const productsData = [
  { 
    id: 1, 
    name: "Chaqueta Carhartt Vintage", 
    image: Foto3, 
    details: "Chaqueta de lona resistente, color verde oliva. Talla M. Detalles: Cierres reforzados, cuello de pana.",
    price: "30.000",
    condition: "10/10",
    specs: { largo: "62 cm", pecho: "50 cm" },
    availableSizes: ["S", "M", "L", "XL", "XXL"] 
  },
  { 
    id: 2, 
    name: "Pantalón Denim Estrellas", 
    image: Foto4, 
    details: "Pantalón vaquero de corte ancho. Color azul índigo. Bordado con diseño de estrellas.",
    price: "45.000",
    condition: "9/10",
    specs: { largo: "105 cm", cintura: "32" },
    availableSizes: ["S", "M", "L", "XL", "XXL"]
  },
  { 
    id: 3, 
    name: "Falda Cargo Camuflaje", 
    image: Foto5, 
    details: "Falda larga de estilo cargo. Estampado de camuflaje, con múltiples bolsillos.",
    price: "25.000",
    condition: "10/10",
    specs: { largo: "85 cm" },
    availableSizes: ["S", "M", "L", "XL", "XXL"]
  },
  { 
    id: 4, 
    name: "Camisa Rayas Distressed", 
    image: Foto6, 
    details: "Camisa de rayas con efecto desgastado. Oversize. Material ligero.",
    price: "28.000",
    condition: "9/10",
    specs: { largo: "70 cm", pecho: "55 cm" },
    availableSizes: ["S", "M", "L", "XL", "XXL"]
  },
  { 
    id: 5, 
    name: "Pantalón Denim Oscuro", 
    image: Foto7, 
    details: "Pantalón vaquero oscuro, corte recto y amplio. 100% Algodón.",
    price: "40.000",
    condition: "10/10",
    specs: { largo: "108 cm", cintura: "34" },
    availableSizes: ["S", "M", "L", "XL", "XXL"]
  },
  { 
    id: 6, 
    name: "Sudadera Gráfica Hooded", 
    image: Foto8, 
    details: "Sudadera con capucha y estampado gótico en la espalda. Color negro.",
    price: "55.000",
    condition: "10/10",
    specs: { largo: "75 cm", pecho: "60 cm" },
    availableSizes: ["S", "M", "L", "XL", "XXL"]
  },
];

const Homeapp = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Estado para la talla seleccionada
  const [selectedSize, setSelectedSize] = useState(null); 

  const handleClose = () => {
    setShowModal(false);
    setSelectedSize(null); // Reseteamos la talla al cerrar
  }

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Componente Modal de React Bootstrap
  const ProductDetailModal = () => (
    <Modal show={showModal} onHide={handleClose} centered size="lg"> {/* Hacemos el modal un poco más grande */}
      <Modal.Header closeButton>
        <Modal.Title>{selectedProduct?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex"> {/* Usamos Flexbox de Bootstrap para alinear imagen y detalles */}
          {/* Columna de Imagen */}
          <div style={{ flex: 1, textAlign: 'center', paddingRight: '20px' }}>
            <img 
              src={selectedProduct?.image} 
              alt={selectedProduct?.name} 
              style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
            />
          </div>
          
          {/* Columna de Detalles y Opciones */}
          <div style={{ flex: 1 }}>
            <h3>${selectedProduct?.price}</h3>
            <p className="text-muted">{selectedProduct?.details}</p>
            
            <hr />

            {/* Especificaciones Técnicas */}
            <h5>Especificaciones:</h5>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              <li><strong>Estado:</strong> {selectedProduct?.condition}</li>
              {/* Mapeamos las especificaciones dinámicamente */}
              {Object.entries(selectedProduct?.specs || {}).map(([key, value]) => (
                <li key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </li>
              ))}
            </ul>

            <hr />

            {/* Selector de Tallas */}
            <h5>Tallas Disponibles:</h5>
            <div className="d-flex gap-2 mb-3">
              {selectedProduct?.availableSizes?.map(size => (
                <Button 
                  key={size}
                  variant={selectedSize === size ? "dark" : "outline-dark"} // Resaltamos la talla seleccionada
                  onClick={() => setSelectedSize(size)}
                  style={{ minWidth: '50px' }}
                >
                  {size}
                </Button>
              ))}
            </div>
            
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        {/* Deshabilitamos el botón si no se ha seleccionado una talla */}
        <Button variant="primary" disabled={!selectedSize}>
          Añadir al Carrito {selectedSize ? `(Talla ${selectedSize})` : ''}
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="homeapp-container">
      {/* Carrusel */}
      <Carousel fade interval={5000}>
        <Carousel.Item>
          <img className="d-block w-100 carousel-img" src={Foto1} alt="Moda urbana 1" />
          <Carousel.Caption>
            <h2 className="carousel-title">EXPRESA TU ESTILO</h2>
            <p className="carousel-text">Con UrbanStyle, marca la diferencia con actitud y autenticidad.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-img" src={Foto2} alt="Moda urbana 2" />
          <Carousel.Caption>
            <h2 className="carousel-title">NEW DROP</h2>
            <p className="carousel-text">Descubre las últimas tendencias de la moda urbana.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <section className="featured-section">
        <h2 className="featured-title">Productos destacados del mes</h2>
        <div className="featured-grid">
          {productsData.map((product) => (
            <img 
              key={product.id}
              src={product.image} 
              alt={product.name} 
              onClick={() => handleShow(product)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </section>

      {/* Renderizado del Modal */}
      {selectedProduct && <ProductDetailModal />}
    </div>
  );
};

export default Homeapp;