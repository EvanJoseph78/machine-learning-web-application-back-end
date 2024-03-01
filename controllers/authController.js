
const { User } = require("../models/User.js");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const authController = {

  signup: async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });

      if (!newUser.username || newUser.username.trim().length < 3 || newUser.username.includes(' ')) {
        return res.status(400).json("Username inválido");
      }

      await newUser.save();

      res.status(200).json("Usuário criado com sucesso!");
    } catch (err) {
      if (err.code === 11000) {
        if (err.keyPattern.username) {
          res.status(400).json("O nome de usuário já está em uso.");
        } else if (err.keyPattern.email) {
          res.status(400).json("O email já está em uso.");
        }
      } else {
        next(err);
      }
    }

  },

  signin: async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "Usuário não encontrado!"));

      const isCorrect = await bcrypt.compare(req.body.password, user.password);

      if (!isCorrect) return next(createError(400, "Senha inválida!"));

      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...others } = user._doc;

      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: 'None', // Adiciona SameSite=None ao cookie
        secure: true // Requer que o cookie seja enviado apenas em conexões HTTPS
      }).status(200).json(others);

    } catch (err) {
      next(err);
    }
  }
}

module.exports = authController;
