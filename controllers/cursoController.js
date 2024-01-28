const { Curso: CursoModel } = require("../models/Curso");

const cursoController = {
  create: async (req, res) => {
    try {
      const curso = {
        nome: req.body.nome,
        introducao: req.body.introducao,
        descricao: req.body.descricao,
        duracao: req.body.duracao,
        disciplina: req.body.disciplina,
        nivel: req.body.nivel,
        certificado: req.body.certificado,
        professores: req.body.professores,
        modulos: req.body.modulos,
      };

      const reponse = await CursoModel.create(curso);

      res.status(201).json({ reponse, msg: "curso criado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  getAll: async (req, res) => {
    try {
      const cursos = await CursoModel.find();
      res.json(cursos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};

module.exports = cursoController;
