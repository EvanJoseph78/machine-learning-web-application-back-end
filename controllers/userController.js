const { User: User } = require("../models/User");

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

}


module.exports = userController;
