import Course from "../models/Course.js";

export const addClass = async (req, res) => {
  try {
    const curso = await Course.findById(req.params.id);
    if (curso) {
      const modulo = curso.modulos.find(
        (modulo) => modulo._id == req.params.moduleId
      );

      if (modulo) {
        const newClass = {
          numeroaula: req.body.numeroaula,
          titulo: req.body.titulo,
          transcricao: req.body.transcricao,
          linkaula: req.body.linkaula,
          linkcapa: req.body.linkcapa,
          materiaisextras: req.body.materiaisextras,
        }

        // Verifica se numeroaula é um número inteiro
        if (!Number.isInteger(newClass.numeroaula) || newClass.numeroaula <= 0) {
          return res.status(400).json({
            error: "O número da aula deve ser um número inteiro maior que 0",
          });
        }

        // Verifica se já existe uma aula com o mesmo número
        const aulaExistente = modulo.aulas.find(
          (aula) => aula.numeroaula === newClass.numeroaula,
        );

        if (aulaExistente) {
          return res
            .status(400)
            .json({ error: "Já existe uma aula com o mesmo número" });
        }

        modulo.aulas.push(newClass);

        await curso.save();

        res.status(200).json(modulo.aulas);

      } else {
        return res.status(404).json({ error: "Modulo não encontrado!" });
      }

    } else {
      return res.status(404).json({ error: "Curso não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const getClasses = async (req, res) => {
  try {
    const curso = await Course.findById(req.params.id);
    if (curso) {
      const modulo = curso.modulos.find(
        (modulo) => modulo._id == req.params.moduleId
      );

      if (modulo) {
        res.status(200).json(modulo.aulas.sort((a, b) => a.numeroaula - b.numeroaula));
      } else {
        return res.status(404).json({ error: "Modulo não encontrado!" });
      }

    } else {
      return res.status(404).json({ error: "Curso não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const updateClass = async (req, res) => {
  try {
    const curso = await Course.findById(req.params.id);
    if (curso) {
      const modulo = curso.modulos.find(
        (modulo) => modulo._id == req.params.moduleId
      );

      if (modulo) {
        // Verifica se numeroaula é um número inteiro
        const aula = modulo.aulas.find(
          (aula) => aula._id == req.params.classId
        );

        if (!aula) {
          return res.status(404).json({ error: "Modulo não encontrado!" });
        }

        if (!Number.isInteger(req.body.numeroaula) || req.body.numeroaula <= 0) {
          return res.status(400).json({
            error: "O número da aula deve ser um número inteiro maior que 0",
          });
        }

        const updatedClass = {
          numeroaula: req.body.numeroaula,
          titulo: req.body.titulo,
          linkaula: req.body.linkaula,
          linkcapa: req.body.linkcapa,
          materiaisextras: req.body.materiaisextras,
          _id: req.params.classId
        }

        // Verifica se já existe uma aula com o mesmo número
        const aulaExistente = modulo.aulas.find(
          (aula) => aula.numeroaula === req.body.numeroaula,
        );

        if (aulaExistente && aula.numeroaula != req.body.numeroaula) {
          return res
            .status(400)
            .json({ error: "Já existe uma aula com o mesmo número" });
        }

        const aulaIndex = modulo.aulas.findIndex(
          aula => aula._id == req.params.classId
        );

        if (aulaIndex === -1) {
          return res.status(404).json({ message: "Aula não encotrada!" });
        }

        const moduleIndex = curso.modulos.findIndex(
          module => module._id == req.params.moduleId
        );

        if (moduleIndex === -1) {
          return res.status(404).json({ message: "Módulo não encontrado" });
        }

        curso.modulos[moduleIndex].aulas[aulaIndex] = updatedClass;

        await curso.save();

        res.status(200).json(curso.modulos);

      } else {
        return res.status(404).json({ error: "Modulo não encontrado!" });
      }

    } else {
      return res.status(404).json({ error: "Curso não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
}

// a fazer
export const deleteClass = async (req, res) => {
  try {
    const curso = await Course.findById(req.params.id);
    if (curso) {
      const modulo = curso.modulos.find(
        (modulo) => modulo._id == req.params.moduleId
      );

      if (modulo) {
        res.status(200).json(modulo.aulas.sort((a, b) => a.numeroaula - b.numeroaula));
      } else {
        return res.status(404).json({ error: "Modulo não encontrado!" });
      }

    } else {
      return res.status(404).json({ error: "Curso não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
}