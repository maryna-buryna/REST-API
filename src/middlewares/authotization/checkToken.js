const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_TOKEN_TYPE } = require('./../../common/config');
const createHttpError = require('http-errors');
const { UNAUTHORIZED } = require('http-status-codes');

const checkToken = (req, res, next) => {
  const authHeaderToken =
    req.headers['Authorization'] || req.headers.authorization || '';
  const [type, token] = authHeaderToken.split(' ');

  if (type !== JWT_TOKEN_TYPE || !token) {
    throw new createHttpError(UNAUTHORIZED, 'Authorization Failed');
  }

  try {
    jwt.verify(token, JWT_SECRET_KEY);
    return next();
  } catch (err) {
    throw new createHttpError(UNAUTHORIZED, 'Authorization Failed');
  }
};

module.exports = checkToken;
