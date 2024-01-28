const router = require("express").Router();

const cursoController = require("../controllers/cursoController");
const cursocontroller = require("../models/Curso");

router.route("/curso").post((req, res) => {
  console.log(req.body);
  cursoController.create(req, res);
});

router.route("/cursos").get((req, res) => cursoController.getAll(req, res));

module.exports = router;
