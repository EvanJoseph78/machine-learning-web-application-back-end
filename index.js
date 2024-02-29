const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cursos = require("./routes/course.js");


//configs
const app = express();
app.use(cookieParser());
app.use(express.json());

dotenv.config()

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_CONNECT_URI)
    .then(() => {
      console.log("Conectado ao banco");
    })
    .catch((err) => {
      throw err;
    });
};

// routes

app.get("/", (_, res) => {
  return res.json("Hello World!");
});

app.use("/api/courses", cursos);

const PORT = 8080;
app.listen(PORT, () => {
  connect();
  console.log("Servidor rodando na porta: " + PORT);
});
