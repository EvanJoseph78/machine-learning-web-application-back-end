import jwt from "jsonwebtoken";
import { createError } from "./error.js"

export const verifyToken = (req, _, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "Você não está autenticado!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token não válido!"));
    req.user = user;
    next();
  })

}
