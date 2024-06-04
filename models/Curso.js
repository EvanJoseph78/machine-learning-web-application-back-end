const mongoose = require("mongoose");

const { Schema } = mongoose;

const cursoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    introducao: {
      type: String,
      required: false,
    },
    descricao: {
      type: String,
      required: false,
    },
    duracao: {
      type: Number,
      required: false,
    },
    disciplina: {
      type: String,
      required: false,
    },
    nivel: {
      type: String,
      required: false,
    },
    certificado: {
      type: Boolean,
      required: false,
    },
    topicos: {
      type: [String],
      required: false,
    },
    professores: [
      {
        imgperfil: {
          type: String,
        },
        nome: {
          type: String,
          required: true,
        },
        formacao1: {
          type: String,
          required: true,
        },
        formacao2: {
          type: String,
        },
      },
    ],
    linkcapa: {
      type: String,
    },
    modulos: [
      {
        numeromodulo: {
          type: Number,
          required: true,
        },
        titulo: {
          type: String,
          required: true,
        },
        linkcapa: {
          type: String,
        },
        aulas: [
          {
            numeroaula: {
              type: Number,
              required: true,
            },
            titulo: {
              type: String,
              required: true,
            },
            transcricao: {
              type: String,
            },
            linkaula: {
              type: String,
              required: true,
            },
            linkcapa: {
              type: String,
            },
            materiaisextras: {
              type: String,
            },
          },
        ],

      },
    ],
    questoes: [
      {
        enunciado: {
          type: String,
          required: true,
        },
        opcoes: [
          {
            texto: {
              type: String,
              required: true,
            },
            correta: {
              type: Boolean,
              required: true,
            },
          },
        ],
      },
    ],

  },
  { timestamps: true },
);

const Curso = mongoose.model("Cursos", cursoSchema);

module.exports = {
  Curso,
  cursoSchema,
};
