const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la tarjeta es obligatorio'],
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'El enlace a la imagen es obligatorio'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?[\w\d-._~:/?#[\]@!$&'()*+,;=]+#?$/.test(v);
      },
      message: 'El formato del enlace a la imagen no es válido',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
