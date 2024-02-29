const router = require("express").Router();

const cursoController = require("../controllers/cursoController");

// rotas de curso

// rota para adicionar um novo curso
router.route("/").post((req, res) => {
  console.log(req.body);
  cursoController.create(req, res);
});

// rota para obter todos os cursos
router.route("/").get((req, res) => cursoController.getAll(req, res));

// rotas de curso

// cria um módulo de um curso
router
  .route("/:idcurso/add/modulos")
  .post((req, res) => cursoController.addModule(req, res));

// rotas de módulo
// cria uma aula dentro de um módulo
router
  .route("/:idcurso/modulos/:idmodulo/add/aula")
  .post((req, res) => cursoController.addAula(req, res));

// rotas de módulo

router
  .route("/:idcurso/modulos/add/question")
  .post((req, res) => cursoController.addQuestion(req, res));

router
  .route("/:idcurso/modulos/questions")
  .get((req, res) => cursoController.getQuestions(req, res));

module.exports = router;
