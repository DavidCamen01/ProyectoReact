import { useAuth } from "../Login/AuthContext";

export default function Productos() {
  const { user } = useAuth();

  const comprar = () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar.");
      return;
    }

    alert("Compra realizada por " + user.email);
  };

  return (
    <div>
      <h1>Productos</h1>

      <p>
        Bienvenido: {user ? user.email : "Invitado"}
      </p>

      <button onClick={comprar}>Comprar</button>
    </div>
  );
}