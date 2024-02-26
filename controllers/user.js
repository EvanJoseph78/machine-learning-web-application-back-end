import User from "../models/User.js";
import { createError } from "../error.js";

export const update = async (req, res, next) => {
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
}

export const deleteUser = async (req, res, next) => {
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
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    // Remove campos sensíveis de cada usuário
    const usersWithoutSensitiveFields = users.map(user => {
      const { password, ...userWithoutSensitiveFields } = user.toObject();
      return userWithoutSensitiveFields;
    });

    res.status(200).json(usersWithoutSensitiveFields);
  } catch (error) {
    next(error);
  }
}

export const getUserById = async (req, res, next) => {
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
}
