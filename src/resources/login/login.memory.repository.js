const createHttpError = require('http-errors');
const { FORBIDDEN } = require('http-status-codes');
const User = require('../users/user.model');

const getUserByLogin = async login => {
  const user = await User.findOne({ login });
  if (!user) {
    throw new createHttpError(FORBIDDEN, 'The login/password is not valid');
  }
  return user;
};

module.exports = { getUserByLogin };
