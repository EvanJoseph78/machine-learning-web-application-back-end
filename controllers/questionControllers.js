const { Curso: Course } = require("../models/Curso");

const questionController = {

  addQuestion: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);

      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      const novaQuestao = {
        enunciado: req.body.enunciado,
        opcoes: req.body.opcoes,
      };

      const opcoesVerdadeiras = novaQuestao.opcoes.filter(
        (opcao) => opcao.correta === true,
      );

      if (opcoesVerdadeiras.length !== 1) {
        return res.status(400).json({
          error: "Deve haver exatamente uma opção marcada como verdadeira",
        });
      }

      curso.questoes.push(novaQuestao);

      await curso.save();

      res.status(201).json({ novaQuestao, message: "Questão adicionada com sucesso!" });


    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }

  },

  getQuestions: async (req, res) => {
    try {

      const curso = await Course.findById(req.params.courseId);

      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      const questoes = curso.questoes;

      // Verifica se há questões disponíveis
      if (!questoes || questoes.length === 0) {
        return res.status(404).json({ error: "Não há questões" });
      }

      const questoesAleatorias = questoes.sort(() => Math.random() - 0.5).slice(0, 10);

      res.status(200).json(questoesAleatorias);

    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }

  },

  deleteQuestion: async (req, res) => {
    try {

      const curso = await Course.findById(req.params.courseId);

      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      const questionIndex = curso.questoes.findIndex(
        question => question._id == req.params.questionId
      );

      if (questionIndex === -1) {
        return res.status(404).json({ message: "Questão não encontrada!" });
      }

      curso.questoes.splice(questionIndex, 1);

      await curso.save();

      res.status(200).json(curso.questoes);


    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }

  },

}

module.exports = questionController;
