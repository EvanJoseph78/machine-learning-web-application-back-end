const { Curso: CursoModel, Curso } = require("../models/Course");

const getAllCourses = async (req, res) => {
  try {
    const cursos = await CursoModel.find();
    const quantidadeCursos = cursos.length;
    res.json({ cursos: cursos, qntcursos: quantidadeCursos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {
  getAllCourses
};

