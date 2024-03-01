const { User: User } = require("../models/User");
const { Curso: Course } = require("../models/Curso");

const userController = {
  getAllUsers: async (_, res) => {
    try {
      const users = await User.find();

      // Remove campos sensíveis de cada usuário
      const usersWithoutSensitiveFields = users.map(user => {
        const { password, ...userWithoutSensitiveFields } = user.toObject();
        return userWithoutSensitiveFields;
      });

      res.status(200).json(usersWithoutSensitiveFields);
    } catch (error) {
      res.status(500).json("Erro interno!");
    }
  },

  update: async (req, res, next) => {
    if (req.params.id === req.user.id) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedUser);

      } catch (error) {
        next(error);
      }

    } else {
      return next(createError(403, "Você só pode alterar a sua conta!"));
    }
  },

  deleteUser: async (req, res, next) => {
    if (req.params.id === req.user.id) {
      try {
        await User.findOneAndDelete(req.params.id);
        res.status(200).json("Usuário deletado com sucesso!");
      } catch (error) {
        next(error);
      }

    } else {
      return next(createError(403, "Você só pode deletar a sua conta!"));
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return next(createError(404, "Usuário não encontrado"));
      }

      // Remove campos sensíveis antes de enviar a resposta
      const { password, ...userWithoutSensitiveFields } = user.toObject(); // Remove a senha do objeto do usuário

      res.status(200).json(userWithoutSensitiveFields);
    } catch (error) {
      next(error);
    }
  },

  getLoggedUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(createError(404, "Usuário não logado!"));
      }

      const { password, ...userWithoutSensitiveFields } = user.toObject();

      res.status(200).json(userWithoutSensitiveFields);
    } catch (error) {
      next(error);
    }
  },

  subscribeCourse: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      const isUserSubscribed = user.cursos.find(
        (curso) => curso.idcurso === req.params.courseId
      );

      if (isUserSubscribed) {
        return res.status(200).json("usuário já inscrito!");
      } else {

        await User.findByIdAndUpdate(req.user.id, {
          $push: { cursos: { idcurso: req.params.courseId, finalizado: false, datafinalizacao: '' } }
        });

        return res.status(200).json("Inscrição no curso realizada com sucesso!");

      }

    } catch (error) {
      console.error(error);

      res.status(500).json({ message: "Internal server error" });
    }
  },

  subscribedCourse: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      const isUserSubscribed = user.cursos.find(
        (curso) => curso.idcurso === req.params.courseId
      );

      if (isUserSubscribed) {
        return res.status(200).json(true);
      } else {
        return res.status(200).json(false);
      }

    } catch (error) {
      console.error(error);

      res.status(500).json({ message: "Internal server error" });
    }
  },

  unsubscribeCourse: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      const isUserSubscribed = user.cursos.find(
        (curso) => curso.idcurso === req.params.courseId
      );

      if (isUserSubscribed) {
        await User.findByIdAndUpdate(req.user.id, {
          $pull: { cursos: { idcurso: req.params.courseId } }
        });

        return res.status(200).json("Desinscrição no curso realizada com sucesso!");
      } else {
        return res.status(200).json("O usuário não está inscrito neste curso!");

      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getSubscribedCourses: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      res.status(200).json(user.cursos);

    } catch (error) {
      console.error(error);

      res.status(500).json({ message: "Internal server error" });
    }
  },

  courseFinished: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      const isUserSubscribed = user.cursos.find(
        (curso) => curso.idcurso === req.params.courseId
      );

      const datafinalizacao = new Date().toISOString();;

      if (isUserSubscribed && !isUserSubscribed.finalizado) {
        await User.findByIdAndUpdate(req.user.id, {
          $set: { cursos: { idcurso: req.params.courseId, finalizado: true, datafinalizacao: datafinalizacao } }
        });

        return res.status(200).json("Curso finalizado!");
      } else if (isUserSubscribed.finalizado) {
        return res.status(200).json("Usuário já finalizou este curso!");

      }
      else {
        return res.status(200).json("O usuário não está inscrito neste curso!");
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getCertificate: async (req, res) => {
    try {

      const user = await User.findById(req.user.id);

      const isUserSubscribed = user.cursos.find(
        (curso) => curso.idcurso === req.params.courseId
      );

      if (isUserSubscribed && isUserSubscribed.finalizado) {
        const curso = user.cursos.find(
          (curso) => curso.idcurso == req.params.courseId
        )

        const course = await Course.findById(curso.idcurso);

        if (!course) {
          return res.status(200).json("Curso não encontrado!");
        }

        const userData = {
          nomeUsuario: user.name,
          nomeCurso: course.nome,
          finalizado: curso.finalizado,
          datafinalizacao: curso.datafinalizacao
        }

        return res.status(200).json(userData);
      } else {
        return res.status(200).json("Curso não finalizado!");
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }

  },
}

module.exports = userController;
