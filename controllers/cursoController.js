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
  addModule: async (req, res) => {
    try {
      const curso = await CursoModel.findById(req.params.id);
      // verifica se o curso existe
      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      // Extrai os dados do módulo do corpo da solicitação
      const novoModulo = {
        numeromodulo: req.body.numeromodulo,
        titulo: req.body.titulo,
        linkcapa: req.body.linkcapa,
        aulas: req.body.aulas,
        questoes: req.body.questoes,
      };

      // Adiciona o módulo ao array de módulos do curso
      curso.modulos.push(novoModulo);

      // Salva o curso atualizado no banco de dados
      await curso.save();

      // Responde com o curso atualizado
      res.status(201).json(curso);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};

module.exports = cursoController;
