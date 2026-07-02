require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./src/middlewares/auth');
const { login, createUser } = require('./src/controllers/users');
const { errorHandler } = require('./src/middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const { url } = require('./src/middlewares/validation');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');

const usersRouter = require('./src/routes/users');
const cardsRouter = require('./src/routes/cards');

process.env.JWT_SECRET =
process.env.NODE_ENV !== 'production'

app.use(cors())
app.options('*', cors());


app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
}), createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.use(errorLogger);
app.use(errorHandler);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ha ocurrido un error en el servidor'
      : message,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App listening on port ${PORT} y aceptando conexiones externas...`);
});