// const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/UnauthorizedError');

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//   let payload;
//   try {
//     payload = jwt.verify(token, 'secret-key');
//   } catch (err) {
//     next(new UnauthorizedError('Необходима авторизация.'));
//   }
//   req.user = payload;
//   return next();
// };

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
  //* * извлекаем токен */
  const token = authorization.replace('Bearer ', '');
  let payload;

  //* * верификация токена */
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
    );
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
  //* * записываем пейлоуд в объект запроса */
  req.user = payload;
  next(); //* * пропускаем запрос дальше */
};