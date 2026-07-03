const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Error de autenticación' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
  token,
  process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret'
);
  } catch (err) {
    return res.status(403).send({ message: 'Token no válido' });
  }

  req.user = payload;
  next();
};