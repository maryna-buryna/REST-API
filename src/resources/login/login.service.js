const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const { FORBIDDEN } = require('http-status-codes');

const { JWT_SECRET_KEY } = require('../../common/config');
const loginRepo = require('./login.memory.repository');

const authenticate = async (login, password) => {
  const user = await loginRepo.getUserByLogin(login);
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new createHttpError(FORBIDDEN, 'The login/password is not valid');
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    JWT_SECRET_KEY
  );

  return { token };
};

module.exports = { authenticate };
