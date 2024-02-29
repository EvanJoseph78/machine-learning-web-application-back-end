const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cursos: {
    type: [
      {
        idcurso: {
          type: String,
        },
        finalizado: {
          type: Boolean,
        },
        datafinalizacao: {
          type: String,
        }
      },
    ],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  userSchema,
};
