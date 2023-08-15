const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {
  login,
  createUser,
} = require('./controllers/users');
const {
  createUserValidation,
  loginValidation,
} = require('./middlewares/validate');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const NotFoundError = require('./errors/NotFoundError');

const app = express();
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
//* * ограничитель запросов */
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   message: 'Слишком много запросов, пожалуйста попробуйте позже',
// });
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Подключено к БД'))
  .catch((err) => console.error('Ошибка подключения к БД:', err));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', 
// authLimiter, 
loginValidation, login);
app.post('/signup', authLimiter, createUserValidation, createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/*', (req, res) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  console.log(`Сервер запущен. Порт ${PORT}`);
});
