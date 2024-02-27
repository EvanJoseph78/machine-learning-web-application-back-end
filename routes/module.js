import express from "express";
import { addModule, deleteModule, getModuleById, getModules, updateModule } from "../controllers/module.js";

const router = express.Router();

//Adiciona um módulo ao curso
router.post("/:id", addModule);

//Get module by id
router.get("/:id/module/:moduleId", getModuleById);

//deleta um módulo ao curso
router.delete("/:id/module/:moduleId", deleteModule);

//editar um módulo
router.put("/:id/module/:moduleId", updateModule);

//get all modules
router.get("/:id/modules", getModules);



export default router;
