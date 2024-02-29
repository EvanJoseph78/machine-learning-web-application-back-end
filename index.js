import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cursos from "./routes/course.js";

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
  // return res.json("Hello World!");
  return res.json("Hello World!" + process.env.MONGODB_CONNECT_URI);
});

app.use("/api/courses", cursos);

const PORT = 8080;
app.listen(PORT, () => {
  connect();
  console.log("Servidor rodando na porta: " + PORT);
});
