const express = require("express");
const path = require("path");
const scrapeRoute = require("./backend/routes/scrapeRoute");

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "./public")));

// Rutas de la API
app.use("/", scrapeRoute);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
