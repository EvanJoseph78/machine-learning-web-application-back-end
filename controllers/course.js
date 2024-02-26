import Course from "../models/Course.js";

export const addCourse = async (req, res) => {
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

    const reponse = await Course.create(curso);

    res.status(201).json({ reponse, msg: "curso criado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const getCourseById = async (req, res) => {
  try {
    const curso = await Course.findOne({ _id: req.params.id });
    if (curso) {
      res.json(curso);
    } else {
      res.status(404).json("Curso não encontrado!");
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const getAllCourses = async (req, res) => {
  try {
    const cursos = await Course.find();
    const quantidadeCursos = cursos.length;
    res.json({ cursos: cursos, qntcursos: quantidadeCursos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const deleteCourse = async (req, res) => {
  try {
    const curso = await Course.findById(req.params.id);
    if (curso) {
      await Course.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Curso deletado com sucesso!" });
    } else {
      res.status(404).json({ message: "Curso não encontrado!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateCourse = async (req, res) => {
  try {
    const curso = await Course.findById(req.params.id);
    if (curso) {
      await Course.findByIdAndUpdate(req.params.id);
      res.status(200).json({ message: "Curso atualizado com sucesso!" });
    } else {
      res.status(404).json({ message: "Curso não encontrado!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
