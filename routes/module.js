const router = require("express").Router();

const cursoController = require("../controllers/cursoController");
const moduleController = require("../controllers/moduleController");

//Adiciona um módulo
router.post("/:courseId/", moduleController.addModule);

//Get module by id
router.get("/:courseId/module/:moduleId", moduleController.getModuleById);

//deleta um módulo ao curso
router.delete("/:courseId/module/:moduleId", moduleController.deleteModule);

//editar um módulo
router.put("/:courseId/module/:moduleId", moduleController.updateModule);

//get all modules
router.get("/:courseId/modules", moduleController.getModules);


module.exports = router;
