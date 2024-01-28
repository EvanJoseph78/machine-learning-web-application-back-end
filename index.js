const express = require("express");

const app = express();
require("dotenv").config(); // permite a aplicação trabalhar com variáveis de ambiente
const PORT = process.env.PORT || 3000;
// documentação da API
const swaggerUi = require("swagger-ui-express");
const swagger = require("./configs/swagger.js");

// configs
app.use(express.json());

// Rota para servir a documentação do Swagger
app.use("/api-docs", swaggerUi.serve, swagger);

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
