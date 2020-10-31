const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const { FORBIDDEN } = require('http-status-codes');

const { JWT_SECRET_KEY } = require('../common/config');
const userService = require('../resources/users/user.service');

const authorization = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await userService.getByLogin(login);
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

    res.json({ token });
  } catch (err) {
    throw new createHttpError(FORBIDDEN, 'The login/password is not valid');
  }
};

module.exports = authorization;
