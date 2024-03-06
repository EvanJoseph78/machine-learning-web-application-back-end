const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // permite a aplicação trabalhar com variáveis de ambiente
const PORT = process.env.PORT || 8080;
// documentação da API
const swaggerUi = require("swagger-ui-express");
const swagger = require("./configs/swagger.js");
const cookieParser = require("cookie-parser");

// configs
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:4200', 'https://machine-learning-web-application-private.vercel.app/'],
  credentials: true,
  allowCredentials: true
}));

app.use(cookieParser());

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
