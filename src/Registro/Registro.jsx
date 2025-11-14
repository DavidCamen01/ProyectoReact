import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/registro.css";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/registro", { email, password });
      setMsg("Registro exitoso. Redirigiendo...");
      setTimeout(() => nav("/login"), 1500);
    } catch (err) {
      setMsg("El correo ya existe.");
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-card" onSubmit={enviar}>
        <h2 className="titulo">Crear Cuenta</h2>

        <label>Email</label>
        <input
          className="input"
          placeholder="correo@example.com"
          onChange={e => setEmail(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          className="input"
          type="password"
          placeholder="•••••••"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn" type="submit">
          Registrarme
        </button>

        {msg && <p className="msg">{msg}</p>}
      </form>
    </div>
  );
}

