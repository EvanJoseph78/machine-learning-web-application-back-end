const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
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

const Curso = mongoose.model("Curso", UserSchema);

module.exports = Curso;
