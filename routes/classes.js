import express from "express";
import { addClass, deleteClass, getClasses, updateClass } from "../controllers/classes.js";

const router = express.Router();

//Adiciona uma aula a um módulo
router.post("/:id/classes/:moduleId", addClass);

//get classes
router.get("/:id/classes/:moduleId", getClasses);

//atualiza aula
router.put("/:id/classes/:moduleId/:classId", updateClass);

//deleta aula
router.delete("/:id/classes/:moduleId/:classId", deleteClass);

export default router;
