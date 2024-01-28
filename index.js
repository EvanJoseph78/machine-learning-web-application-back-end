const express = require("express");

const app = express();
require("dotenv").config(); // permite a aplicação trabalhar com variáveis de ambiente
const PORT = process.env.PORT || 3000;
// documentação da API
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocs = require("./swagger.json");

// configs
app.use(express.json());

// Carregue a especificação OpenAPI do arquivo YAML

// Rota para servir a documentação do Swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL }),
);

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
