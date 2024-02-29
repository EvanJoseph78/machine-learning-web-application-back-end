const { Curso: Course } = require("../models/Curso");

const moduleController = {

  addModule: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);

      if (curso) {
        // Extrai os dados do módulo do corpo da solicitação
        const newModule = {
          numeromodulo: req.body.numeromodulo,
          titulo: req.body.titulo,
          linkcapa: req.body.linkcapa,
        };

        // Verifica se já existe um módulo com o mesmo número
        const moduloExistente = curso.modulos.find(
          (modulo) => modulo.numeromodulo === newModule.numeromodulo,
        );

        if (moduloExistente) {
          return res
            .status(400)
            .json({ error: "Já existe um módulo com o mesmo número" });
        }
        // Garante que numeromodulo é um número inteiro
        if (
          !Number.isInteger(newModule.numeromodulo) ||
          newModule.numeromodulo <= 0
        ) {
          return res.status(400).json({
            error: "O número do módulo deve ser um número inteiro maior que 0",
          });
        }

        // Adiciona o módulo ao array de módulos do curso
        curso.modulos.push(newModule);

        // Salva o curso atualizado no banco de dados
        await curso.save();

        // Responde com o curso atualizado
        res.status(201).json(newModule);

      } else {
        return res.status(404).json({ error: "Curso não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  deleteModule: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);
      if (curso) {
        const moduleIndex = curso.modulos.findIndex(
          module => module._id == req.params.moduleId
        );

        if (moduleIndex === -1) {
          return res.status(404).json({ message: "Módulo não encontrado" });
        }

        curso.modulos.splice(moduleIndex, 1);

        await curso.save();

        return res.status(200).json({ message: "Módulo excluído com sucesso" });

      } else {
        return res.status(404).json({ error: "Curso não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  getModules: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);

      if (curso) {
        return res.status(200).json(curso.modulos.sort((a, b) => a.numeromodulo - b.numeromodulo));
      } else {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  updateModule: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);
      if (curso) {
        const updatedModule = {
          numeromodulo: req.body.numeromodulo,
          titulo: req.body.titulo,
          linkcapa: req.body.linkcapa,
          _id: req.params.moduleId
        }

        const moduleIndex = curso.modulos.findIndex(
          module => module._id == req.params.moduleId
        );

        if (moduleIndex === -1) {
          return res.status(404).json({ message: "Módulo não encontrado" });
        }

        const moduloExistente = curso.modulos.find(
          (modulo) => modulo.numeromodulo === updatedModule.numeromodulo,
        );

        // o número do módulo pode ser igual desde de que seja o mesmo módulo
        if (moduloExistente && !(moduloExistente.numeromodulo == curso.modulos[moduleIndex].numeromodulo)) {
          return res
            .status(400)
            .json({ error: "Já existe um módulo com o mesmo número" });
        }
        // Garante que numeromodulo é um número inteiro
        if (
          !Number.isInteger(updatedModule.numeromodulo) ||
          updatedModule.numeromodulo <= 0
        ) {
          return res.status(400).json({
            error: "O número do módulo deve ser um número inteiro maior que 0",
          });
        }

        curso.modulos[moduleIndex] = updatedModule;

        await curso.save();

        return res.status(200).json(curso.modulos[moduleIndex]);

      } else {
        return res.status(404).json({ error: "Curso não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  getModuleById: async (req, res) => {
    try {
      const curso = await Course.findById(req.params.courseId);
      if (curso) {
        const modulo = curso.modulos.find(
          (modulo) => modulo._id == req.params.moduleId
        );
        console.log(modulo);

        return res.status(200).json(modulo);

      } else {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  },

}

module.exports = moduleController;
