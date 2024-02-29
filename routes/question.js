const router = require("express").Router();

const questionController = require("../controllers/questionControllers");

//Adiciona uma questão ao curso
router.post("/:courseId/questions", questionController.addQuestion);

//Get questions
router.get("/:courseId/questions", questionController.getQuestions);

//delete question
router.delete("/:courseId/question/:questionId", questionController.deleteQuestion);

//TODO - fazer o updade question e o delete

module.exports = router;
