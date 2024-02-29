const router = require("express").Router();

const classController = require("../controllers/classController");


//Adiciona uma aula a um módulo
router.post("/:courseId/classes/:moduleId", classController.addClass);

//get classes
router.get("/:courseId/classes/:moduleId", classController.getClasses);

//atualiza aula
router.put("/:courseId/classes/:moduleId/:classId", classController.updateClass);

//deleta aula
router.delete("/:courseId/classes/:moduleId/:classId", classController.deleteClass);

module.exports = router;
