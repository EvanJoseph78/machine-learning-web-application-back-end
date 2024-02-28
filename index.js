import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import cursos from "./routes/course.js";
import modulo from "./routes/module.js";
import classes from "./routes/classes.js";
import questions from "./routes/questions.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

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

      app.get("/teste", (_, res) => {
        return res.json("Conectado ao banco");
      });
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
