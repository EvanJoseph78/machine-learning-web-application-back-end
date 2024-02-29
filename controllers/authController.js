
const { User } = require("../models/User.js");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const authController = {

  signup: async (req, res, next) => {
    console.log("Passou Aqui!");
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });

      await newUser.save();
      res.status(200).send("Usuário criado com sucesso!");
    } catch (err) {
      if (err.code === 11000 && err.keyPattern.email) {
        res.status(400).json({ error: "O email já está em uso." });
      } else if (err.code === 11000 && err.keyPattern.username) {
        res.status(400).json({ error: "O nome de usuário já está em uso." });
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
        httpOnly: true
      }).status(200).json(others);

    } catch (err) {
      next(err);
    }
  }
}

module.exports = authController;
