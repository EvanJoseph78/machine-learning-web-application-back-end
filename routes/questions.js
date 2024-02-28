const express = require("express");
const { addQuestion, deleteQuestion, getQuestions } = require("../controllers/questions.js");

const router = express.Router();

//Adiciona uma questão ao curso
router.post("/:courseId/questions", addQuestion);

//Get questions
router.get("/:courseId/questions", getQuestions);

//delete question
router.delete("/:courseId/question/:questionId", deleteQuestion);

//TODO - fazer o updade question e o delete

module.exports = router;
