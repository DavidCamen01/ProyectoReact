import { useState } from "react";
import axios from "axios";
import { useAuth } from "../Login/AuthContext"; // Manteniendo tu importación original
import { useNavigate } from "react-router-dom"; // Manteniendo tu importación original
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "./login.css"; // Importamos el nuevo CSS de estilo

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();
    setMsg(""); // Limpiar mensaje al intentar iniciar sesión
    
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password
      });

      login(res.data);
      nav("/productos");

    } catch (err) {
      if (err.response?.status === 401) {
        setMsg("Correo o contraseña incorrectos.");
      } else {
        setMsg("Error desconocido. Inténtalo de nuevo.");
      }
    }
  };

  return (
    // Contenedor principal para el fondo oscuro y centrado
    <div className="login-page-container">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card className="login-card p-4">
          <Card.Body>
            <h2 className="text-center mb-4 login-title">Iniciar Sesión</h2>
            <p className="text-center mb-4 login-subtitle">Accede a tu cuenta de Second Chance</p>

            {/* Mostrar mensaje de error con estilo de Bootstrap */}
            {msg && <Alert variant="danger" className="text-center">{msg}</Alert>}

            <Form onSubmit={enviar}>
              
              {/* Campo Email */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Introduce tu correo"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Campo Contraseña */}
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Tu contraseña secreta"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100 login-button">
                Entrar
              </Button>
            </Form>
            
            <p className="text-center mt-3 login-help-text">
                ¿Aún no tienes cuenta? <a href="/registro">Regístrate aquí</a>
            </p>

          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}