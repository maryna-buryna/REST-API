const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const { UNAUTHORIZED } = require('http-status-codes');

const { JWT_SECRET_KEY } = require('../common/config');
const User = require('../resources/users/user.model');

const authorization = async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({ login });
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!user || !isValidPassword) {
    throw new createHttpError(UNAUTHORIZED, 'The login/password is not valid');
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    JWT_SECRET_KEY
  );

  res.json({ token });
};

module.exports = authorization;
