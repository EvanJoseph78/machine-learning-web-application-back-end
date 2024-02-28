const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const auth = require("./routes/auth.js");
const users = require("./routes/users.js");
const cursos = require("./routes/course.js");
const modulo = require("./routes/module.js");
const classes = require("./routes/classes.js");
const questions = require("./routes/questions.js");
const cookieParser = require("cookie-parser");
const cors = require('cors');

//configs
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

dotenv.config()

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_CONNECT_URI)
    .then(() => {
      console.log("Conectado ao banco");

    })
    .catch((err) => {
      console.log("Falha ao conectar com o banco" + err);
      throw err;
    });
};

// routes

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/courses", cursos);
app.use("/api/course", modulo);
app.use("/api/course", classes);
app.use("/api/course", questions);


app.get("/", (_, res) => {
  return res.json("Hello World! Evan Joseph");
});

const PORT = 8080;
app.listen(PORT, () => {
  connect();
  console.log("Servidor rodando na porta: " + PORT);
});
