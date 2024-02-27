import express from "express";
import { addClass, getClasses } from "../controllers/classes.js";

const router = express.Router();

//Adiciona uma aula a um módulo
router.post("/:id/classes/:moduleId", addClass);

//get classes
router.get("/:id/classes/:moduleId", getClasses);

export default router;
