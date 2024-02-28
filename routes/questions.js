import express from "express";
import { addQuestion, getQuestions } from "../controllers/questions.js";

const router = express.Router();

//Adiciona uma questão ao curso
router.post("/:courseId/questions", addQuestion);

//Get questions
router.get("/:courseId/questions", getQuestions);

export default router;
