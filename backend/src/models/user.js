const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Ingresa tu nombre',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Ingresa información sobre ti',
  },
  avatar: {
    type: String,
    default: 'https://unsplash.com/es/ilustraciones/marcador-de-posicion-de-imagen-de-perfil-para-una-persona-desconocida-x9LSAQ7_V1s',
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?[\w\d-._~:/?#[\]@!$&'()*+,;=]+#?$/.test(v);
      },
      message: 'El formato del enlace al avatar no es válido',
    },
  },

  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Formato de correo electrónico no válido',
    },
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);