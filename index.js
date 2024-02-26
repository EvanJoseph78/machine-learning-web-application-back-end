import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import cursos from "./routes/course.js";
import modulo from "./routes/module.js";
import cookieParser from "cookie-parser";

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

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/courses", cursos);
app.use("/api/course", modulo);


const PORT = 8080;
app.listen(PORT, () => {
  connect();
  console.log("Servidor rodando na porta: " + PORT);
});
