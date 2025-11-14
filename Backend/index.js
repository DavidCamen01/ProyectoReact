const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a Mongo Atlas usando .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas conectado"))
  .catch(err => console.log("Error conectando a Mongo:", err));

// REGISTRO
app.post("/registro", async (req, res) => {
  try {

     console.log("RECIBIDO DESDE EL FRONT:", req.body);
    const { email, password, name } = req.body;

    const existe = await User.findOne({ email });

    if (existe) {
      return res.status(400).json({ error: "Correo ya existe" });
    }

    const nuevo = await User.create({ email, password, name });
    return res.json({ ok: true, msg: "Usuario registrado" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error del servidor" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Correo incorrecto" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    return res.json({
      ok: true,
      email: user.email
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error del servidor" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`API ejecutándose en puerto ${process.env.PORT}`)
);
