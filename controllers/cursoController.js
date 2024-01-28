const { Curso: CursoModel, Curso } = require("../models/Curso");

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
      const curso = await CursoModel.findById(req.params.idcurso);
      // verifica se o curso existe
      console.log(curso);
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
  addAula: async (req, res) => {
    try {
      const curso = await CursoModel.findById(req.params.idcurso);

      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      const modulo = curso.modulos.id(req.params.idmodulo);
      console.log(modulo);

      if (!modulo) {
        return res.status(404).json({ error: "Módulo não encontrado" });
      }

      const novaAula = {
        numeroaula: req.body.numeroaula,
        titulo: req.body.titulo,
        linkaula: req.body.linkaula,
        linkcapa: req.body.linkcapa,
        materiaisextras: req.body.materiaisextras,
      };

      // Adiciona a aula ao array de aulas do módulo
      modulo.aulas.push(novaAula);

      await curso.save();

      res.status(201).json({ curso, message: "Aula adicionada com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};

module.exports = cursoController;
