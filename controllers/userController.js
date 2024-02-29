const { User: User } = require("../models/User");

const userController = {
  getAllUsers: async (req, res) => {
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
  }
}


module.exports = userController;
