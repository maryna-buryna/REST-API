const { NOT_FOUND, BAD_REQUEST } = require('http-status-codes');
const { errLogger } = require('../common/logger');
const { NotFoundError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  errLogger.error(err.message);
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND).send(err.message);
  } else {
    res.status(BAD_REQUEST).send(err.message);
  }
  next(err);
};

module.exports = errorHandler;
