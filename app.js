const express = require("express");
const path = require("path");
const scrapeRoute = require("./backend/routes/scrapeRoute");
const cors = require("cors"); 

const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir CORS
app.use(cors());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "./public")));

// Rutas de la API
app.use("/", scrapeRoute);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
