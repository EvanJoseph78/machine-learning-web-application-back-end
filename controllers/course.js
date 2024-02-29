import Course from "../models/Course.js";

export const getAllCourses = async (req, res) => {
  try {
    // const cursos = await Course.find();
    // const quantidadeCursos = cursos.length;
    // res.json({ cursos: cursos, qntcursos: quantidadeCursos });
    res.json("Teste2");
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

