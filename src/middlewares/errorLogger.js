const { NOT_FOUND } = require('http-status-codes');
const { createLogger, format, transports } = require('winston');
const { NotFoundError } = require('../utils/errors');
const { combine, colorize, simple } = format;

const logger = createLogger({
  format: combine(colorize(), simple()),
  transports: [new transports.Console()]
});

const errorLogger = (err, req, res) => {
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND).send(err.message);
  } else {
    logger.error(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = errorLogger;
