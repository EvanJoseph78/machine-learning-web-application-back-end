const express = require("express");

const app = express();
require("dotenv").config(); // permite a aplicação trabalhar com variáveis de ambiente
const PORT = process.env.PORT || 3000;

// configs
app.use(express.json());

// routes

app.get("/", (_, res) => {
  return res.json("Hello World!");
});

const routes = require("./routes/router.js");
app.use("/api", routes);

// Conexão com o banco

const connectDB = require("./db/connectMongo");

connectDB();

// iniciando servidor

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
