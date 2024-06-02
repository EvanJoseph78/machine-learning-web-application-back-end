const { Curso: Course } = require("../models/Curso");

const cursoController = {

  addCourse: async (req, res) => {
    try {
      const curso = {
        nome: req.body.nome,
        introducao: req.body.introducao,
        descricao: req.body.descricao,
        duracao: req.body.duracao,
        disciplina: req.body.disciplina,
        nivel: req.body.nivel,
        certificado: req.body.certificado,
        topicos: req.body.topicos,
        professores: req.body.professores,
        linkcapa: req.body.linkcapa,
      };

      const createdCourse = await Course.create(curso);
      const id = createdCourse._id;

      res.status(201).json({ id, msg: "curso criado com sucesso!" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  getCourseById: async (req, res) => {
    try {
      const curso = await Course.findOne({ _id: req.params.courseId });
      if (curso) {
        res.json(curso);
      } else {
        res.status(404).json("Curso não encontrado!");
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  getAllCourses: async (req, res) => {
    try {
      const cursos = await Course.find();
      const quantidadeCursos = cursos.length;
      res.json({ cursos: cursos, qntcursos: quantidadeCursos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  getAllCoursesBasicInfo: async (_, res) => {
    try {
      const cursos = await Course.find();
      const quantidadeCursos = cursos.length;

      // Mapear os cursos para extrair apenas _id e nome de cada curso
      const courseBasicInfo = cursos.map(curso => ({
        _id: curso._id,
        nome: curso.nome
      }));

      res.json({ cursos: courseBasicInfo, qntcursos: quantidadeCursos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);
      if (curso) {
        await Course.findByIdAndDelete(req.params.courseId);
        res.status(200).json({ message: "Curso deletado com sucesso!" });
      } else {
        res.status(404).json({ message: "Curso não encontrado!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const newCourse = {
        nome: req.body.nome,
        introducao: req.body.introducao,
        descricao: req.body.descricao,
        duracao: req.body.duracao,
        disciplina: req.body.disciplina,
        nivel: req.body.nivel,
        certificado: req.body.certificado,
        topicos: req.body.topicos,
        professores: req.body.professores,
        linkcapa: req.body.linkcapa,
      };

      const curso = await Course.findById(req.params.courseId);
      if (curso) {
        await Course.findByIdAndUpdate(req.params.courseId, newCourse);
        res.status(200).json({ message: "Curso atualizado com sucesso!" });
      } else {
        res.status(404).json({ message: "Curso não encontrado!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  patchCourse: async (req, res) => {
    try {
      const updates = req.body;  // This contains only the fields to be updated
      const curso = await Course.findById(req.params.courseId);

      if (curso) {
        await Course.findByIdAndUpdate(req.params.courseId, updates, { new: true });
        res.status(200).json({ message: "Curso atualizado com sucesso!" });
      } else {
        res.status(404).json({ message: "Curso não encontrado!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },


};

module.exports = cursoController;
