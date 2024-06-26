const { Curso: Course } = require("../models/Curso");

const classController = {

  addClass: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);
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
  },

  getClasses: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);
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
  },

  updateClass: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);
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
            return res.status(404).json({ error: "Aula não encontrada!" });
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

          res.status(200).json(updatedClass);

        } else {
          return res.status(404).json({ error: "Modulo não encontrado!" });
        }

      } else {
        return res.status(404).json({ error: "Curso não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  deleteClass: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);
      if (curso) {
        const modulo = curso.modulos.find(
          (modulo) => modulo._id == req.params.moduleId
        );

        if (!modulo) {
          return res.status(404).json({ error: "Modulo não encontrado!" });
        }

        const aula = modulo.aulas.find(
          (aula) => aula._id == req.params.classId
        );

        if (!aula) {
          return res.status(404).json({ error: "Aula não encontrada!" });
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

        curso.modulos[moduleIndex].aulas.splice(aulaIndex, 1);

        await curso.save();

        return res.status(200).json("aula deletada com sucesso!");

      } else {
        return res.status(404).json({ error: "Curso não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  getClassById: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);
      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      const modulo = curso.modulos.find(
        (modulo) => modulo._id == req.params.moduleId
      );
      if (!modulo) {
        return res.status(404).json({ error: "Módulo não encontrado" });
      }

      const aula = modulo.aulas.find(
        (aula) => aula._id == req.params.classId
      );
      if (!aula) {
        return res.status(404).json({ error: "Aula não encontrada" });
      }

      res.status(200).json(aula);
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },


}

module.exports = classController;
