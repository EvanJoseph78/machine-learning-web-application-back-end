const router = require("express").Router();

const cursoController = require("../controllers/cursoController");
const cursocontroller = require("../models/Curso");

// rota para adicionar um novo curso

router.route("/cursos").post((req, res) => {
  console.log(req.body);
  cursoController.create(req, res);
});

// rota para obter todos os cursos
router.route("/cursos").get((req, res) => cursoController.getAll(req, res));

// cria um módulo de um curso
router
  .route("/cursos/:id/add/modulos")
  .post((req, res) => cursoController.addModule(req, res));

// cria uma aula dentro de um módulo
router
  .route("/cursos/:id/modulos/add/aula")
  .post((req, res) => cursoController.addAula());

module.exports = router;
